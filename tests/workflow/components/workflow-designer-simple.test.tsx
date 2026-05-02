// 一个非常简单的测试文件，用于验证WorkflowDesigner组件是否能正确导入和渲染
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WorkflowDesigner } from '@/components/workflow/workflow-designer';

// Mock reactflow
jest.mock('reactflow', () => ({
  ReactFlow: ({ children, ...props }: { children?: React.ReactNode, [key: string]: any }) => (
    <div data-testid="react-flow-container" {...props}>
      Mocked ReactFlow
      {children}
    </div>
  ),
  useNodesState: () => [[], jest.fn(), jest.fn()],
  useEdgesState: () => [[], jest.fn(), jest.fn()],
  MiniMap: () => <div>MiniMap</div>,
  Controls: () => <div>Controls</div>,
  Background: () => <div>Background</div>,
  useReactFlow: () => ({})
}));

// Mock sonner
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

// Mock UI components
jest.mock('@/components/ui/button', () => ({ 
  Button: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button> 
}));
jest.mock('@/components/ui/input', () => ({ Input: (props: any) => <input {...props} /> }));
jest.mock('@/components/ui/label', () => ({ Label: ({ children }: any) => <label>{children}</label> }));
jest.mock('@/components/ui/textarea', () => ({ Textarea: (props: any) => <textarea {...props} /> }));
jest.mock('@/components/ui/card', () => ({ 
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h3>{children}</h3>
}));
jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children }: any) => <div>{children}</div>,
  TabsContent: ({ children }: any) => <div>{children}</div>,
  TabsList: ({ children }: any) => <div>{children}</div>,
  TabsTrigger: ({ children }: any) => <button>{children}</button>
}));
jest.mock('lucide-react', () => ({}));

// Mock workflow services
jest.mock('@/services/workflow/workflow-engine.service', () => ({
  createWorkflow: jest.fn(),
  updateWorkflow: jest.fn(),
  deleteWorkflow: jest.fn(),
  getWorkflowById: jest.fn(),
  getWorkflows: jest.fn(),
  executeWorkflow: jest.fn()
}));
jest.mock('@/services/workflow/workflow-node.service', () => ({
  createNode: jest.fn(),
  updateNode: jest.fn(),
  deleteNode: jest.fn(),
  getNodesByWorkflowId: jest.fn()
}));
jest.mock('@/services/workflow/workflow-edge.service', () => ({
  createEdge: jest.fn(),
  deleteEdge: jest.fn(),
  getEdgesByWorkflowId: jest.fn()
}));


describe('WorkflowDesigner Component - Simple Test', () => {
  it('should import and render without throwing errors', () => {
    // 只测试组件是否能导入和渲染，不做具体断言
    expect(() => {
      render(<WorkflowDesigner />);
    }).not.toThrow();
  });
});
