/**
 * 工作流边（连接线）服务
 * 提供工作流边的 CRUD 操作
 */

export interface WorkflowEdge {
  id: string;
  workflowId: string;
  sourceNodeId: string;
  targetNodeId: string;
  label?: string;
  type?: 'default' | 'success' | 'error' | 'condition';
  condition?: string;
  animated?: boolean;
  style?: {
    stroke?: string;
    strokeWidth?: number;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

class WorkflowEdgeService {
  /**
   * 创建边
   */
  async createEdge(workflowId: string, edgeData: Omit<WorkflowEdge, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkflowEdge> {
    const newEdge: WorkflowEdge = {
      ...edgeData,
      id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      workflowId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newEdge;
  }

  /**
   * 删除边
   */
  async deleteEdge(edgeId: string): Promise<void> {
    // 删除边逻辑
  }

  /**
   * 根据工作流ID获取所有边
   */
  async getEdgesByWorkflowId(workflowId: string): Promise<WorkflowEdge[]> {
    // 返回工作流的所有边
    return [];
  }
}

export const workflowEdgeService = new WorkflowEdgeService();
export default workflowEdgeService;
