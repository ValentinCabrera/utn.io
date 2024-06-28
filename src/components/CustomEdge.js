import { getBezierPath } from 'reactflow';

export default function CustomEdge(props) {

    const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data } = props;

    const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    const midX1 = sourceX + (targetX - sourceX) / 4;
    const midX2 = sourceX + (targetX - sourceX) / 4 * 3;

    const midY1 = sourceY + (targetY - sourceY) / 4;
    const midY2 = sourceY + (targetY - sourceY) / 4 * 3;

    return (
        <>
            <path
                style={{
                    strokeWidth: "4"
                }}
                className="react-flow__edge-path"
                d={edgePath}
            />
            {data.peso1 &&
                <text
                    x={midX1}
                    y={midY1}
                    style={{ fontSize: 12, fill: 'black', userSelect: 'none', WebkitUserSelect: 'none' }}
                >
                    {data.peso1}
                </text>
            }
            {data.peso2 &&
                <text
                    x={midX2}
                    y={midY2}
                    style={{ fontSize: 12, fill: 'black', userSelect: 'none', WebkitUserSelect: 'none' }}
                >
                    {data.peso2}
                </text>
            }
        </>
    );
}