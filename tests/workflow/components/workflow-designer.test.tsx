// WorkflowDesigner 组件测试
// 专注于验证核心功能

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// ==================== Mock 配置 ====================

// Mock CSS 文件
jest.mock('reactflow/dist/style.css', () => ({}), { virtual: true });

// Mock reactflow - 完整版本
jest.mock('reactflow', () => ({
  ReactFlow: ({ children, ...props }: any) => (
    <div data-testid="react-flow-container" {...props}>
      {children}
    </div>
  ),
  Background: () => <div data-testid="react-flow-background" />,
  Controls: () => <div data-testid="react-flow-controls">Controls</div>,
  MiniMap: () => <div data-testid="react-flow-minimap">MiniMap</div>,
  Panel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useNodesState: jest.fn().mockImplementation((initialNodes = []) => {
    const setNodes = jest.fn();
    const onNodesChange = jest.fn();
    return [initialNodes, setNodes, onNodesChange];
  }),
  useEdgesState: jest.fn().mockImplementation((initialEdges = []) => {
    const setEdges = jest.fn();
    const onEdgesChange = jest.fn();
    return [initialEdges, setEdges, onEdgesChange];
  }),
  useReactFlow: () => ({
    getNodes: jest.fn().mockReturnValue([]),
    getEdges: jest.fn().mockReturnValue([]),
    fitView: jest.fn(),
    setCenter: jest.fn(),
    toObject: jest.fn().mockReturnValue({ nodes: [], edges: [] }),
    zoomIn: jest.fn(),
    zoomOut: jest.fn()
  }),
  addEdge: jest.fn().mockImplementation((edge: any, edges: any[]) => [...edges, edge])
}));

// Mock sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock 所有 UI 组件
jest.mock('@/components/ui/button', () => ({ 
  Button: ({ children, onClick, ...props }: any) => 
    <button onClick={onClick} {...props}>{children}</button> 
}));

jest.mock('@/components/ui/input', () => ({ 
  Input: ({ placeholder, value, onChange, ...props }: any) => 
    <input 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      {...props} 
    /> 
}));

jest.mock('@/components/ui/label', () => ({ 
  Label: ({ children, htmlFor, ...props }: any) => 
    <label htmlFor={htmlFor} {...props}>{children}</label> 
}));

jest.mock('@/components/ui/textarea', () => ({ 
  Textarea: ({ placeholder, value, onChange, ...props }: any) => 
    <textarea 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      {...props} 
    /> 
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: any) => 
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children, ...props }: any) => 
    <div data-testid="dialog-content" {...props}>{children}</div>,
  DialogHeader: ({ children }: any) => 
    <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: any) => 
    <h2 data-testid="dialog-title">{children}</h2>,
  DialogFooter: ({ children }: any) => 
    <div data-testid="dialog-footer">{children}</div>
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, ...props }: any) => 
    <div data-testid="select" {...props}>{children}</div>,
  SelectContent: ({ children }: any) => 
    <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children, value, ...props }: any) => 
    <div data-value={value} data-testid="select-item" {...props}>{children}</div>,
  SelectTrigger: ({ children, ...props }: any) => 
    <button data-testid="select-trigger" {...props}>{children}</button>,
  SelectValue: ({ placeholder, ...props }: any) => 
    <span data-placeholder={placeholder} {...props}>{placeholder || 'Select...'}</span>
}));

jest.mock('@/components/ui/card', () => ({ 
  Card: ({ children, className, ...props }: any) => 
    <div data-testid="card" className={className} {...props}>{children}</div>,
  CardContent: ({ children, className, ...props }: any) => 
    <div data-testid="card-content" className={className} {...props}>{children}</div>,
  CardHeader: ({ children, className, ...props }: any) => 
    <div data-testid="card-header" className={className} {...props}>{children}</div>,
  CardTitle: ({ children, className, ...props }: any) => 
    <h3 data-testid="card-title" className={className} {...props}>{children}</h3>
}));

jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, ...props }: any) => 
    <div data-testid="tabs" {...props}>{children}</div>,
  TabsContent: ({ children, value, ...props }: any) => 
    <div data-testid={`tabs-content-${value}`} {...props}>{children}</div>,
  TabsList: ({ children, ...props }: any) => 
    <div data-testid="tabs-list" {...props}>{children}</div>,
  TabsTrigger: ({ children, value, ...props }: any) => 
    <button data-testid={`tabs-trigger-${value}`} {...props}>{children}</button>
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Play: () => <svg data-testid="icon-play" />,
  Square: () => <svg data-testid="icon-square" />,
  GitBranch: () => <svg data-testid="icon-gitbranch" />,
  CheckCircle: () => <svg data-testid="icon-checkcircle" />,
  Clock: () => <svg data-testid="icon-clock" />,
  Webhook: () => <svg data-testid="icon-webhook" />,
  Code: () => <svg data-testid="icon-code" />,
  Settings: () => <svg data-testid="icon-settings" />,
  Plus: () => <svg data-testid="icon-plus" />,
  Save: () => <svg data-testid="icon-save" />,
  Eye: () => <svg data-testid="icon-eye" />,
  Edit: () => <svg data-testid="icon-edit" />,
  Trash2: () => <svg data-testid="icon-trash2" />
}));

// Mock workflow services
jest.mock('../../../services/workflow/workflow-engine.service', () => ({
  WorkflowEngineService: jest.fn().mockImplementation(() => ({
    saveWorkflowDefinition: jest.fn().mockResolvedValue(undefined)
  }))
}));

// 导入组件（在所有 mock 之后）
import { WorkflowDesigner } from '../../../components/workflow/workflow-designer';

// ==================== 测试套件 ====================

describe('WorkflowDesigner Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window.alert and window.confirm
    window.alert = jest.fn();
    window.confirm = jest.fn();
  });

  it('should render without crashing', () => {
    expect(() => {
      render(<WorkflowDesigner />);
    }).not.toThrow();
  });

  it('should display main container with ReactFlow', () => {
    render(<WorkflowDesigner />);
    
    expect(screen.getByTestId('react-flow-container')).toBeInTheDocument();
  });

  it('should have correct component structure', () => {
    const { container } = render(<WorkflowDesigner />);
    
    // 验证组件渲染了内容
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });
});
