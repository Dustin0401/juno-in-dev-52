import { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  NodeOrigin,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { BacktestToolbar } from './BacktestToolbar'
import { BacktestSidebar } from './BacktestSidebar'
import { StrategyNode } from './nodes/StrategyNode'
import { IndicatorNode } from './nodes/IndicatorNode'
import { ConditionNode } from './nodes/ConditionNode'
import { DataSourceNode } from './nodes/DataSourceNode'
import { OutputNode } from './nodes/OutputNode'

const nodeTypes = {
  strategy: StrategyNode,
  indicator: IndicatorNode,
  condition: ConditionNode,
  dataSource: DataSourceNode,
  output: OutputNode,
}

const initialNodes: Node[] = [
  {
    id: 'data-1',
    type: 'dataSource',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Price Data',
      symbol: 'BTC/USDT',
      timeframe: '1h'
    },
  },
]

const initialEdges: Edge[] = []

const nodeOrigin: NodeOrigin = [0.5, 0]

export function BacktestCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNode = useCallback((type: string, position: { x: number; y: number }) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: getDefaultNodeData(type),
    }
    setNodes((nds) => nds.concat(newNode))
  }, [setNodes])

  const getDefaultNodeData = (type: string) => {
    switch (type) {
      case 'strategy':
        return { label: 'Strategy', strategyType: 'moving_average' }
      case 'indicator':
        return { label: 'RSI', indicatorType: 'rsi', period: 14 }
      case 'condition':
        return { label: 'Buy Condition', conditionType: 'above', value: 50 }
      case 'dataSource':
        return { label: 'Data Source', symbol: 'BTC/USDT', timeframe: '1h' }
      case 'output':
        return { label: 'Results', outputType: 'performance' }
      default:
        return { label: 'Node' }
    }
  }

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      
      if (typeof type === 'undefined' || !type) {
        return
      }

      // Get the ReactFlow bounds for accurate positioning
      const reactFlowBounds = (event.target as Element).closest('.react-flow')?.getBoundingClientRect()
      
      if (reactFlowBounds) {
        const position = {
          x: event.clientX - reactFlowBounds.left - 80,
          y: event.clientY - reactFlowBounds.top - 40,
        }
        addNode(type, position)
      } else {
        // Fallback positioning
        const position = {
          x: event.clientX - 250,
          y: event.clientY - 100,
        }
        addNode(type, position)
      }
    },
    [addNode]
  )

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <BacktestSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <BacktestToolbar />
        
        {/* Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            nodeOrigin={nodeOrigin}
            fitView
            className="bg-background"
          >
            <Background 
              color="hsl(var(--border))" 
              gap={20} 
              size={1}
            />
            <Controls 
              className="bg-surface border-line"
              showInteractive={false}
            />
            <MiniMap 
              className="bg-surface border-line"
              nodeColor="hsl(var(--primary))"
              maskColor="rgba(0,0,0,0.1)"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}