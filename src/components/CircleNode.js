import React, { memo } from 'react';
import { Handle, useStore, Position } from 'reactflow';

export default memo(({ id }) => {
    return (
        <>
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                border: "2px solid black",
            }}>
                <div className="inner">{id}</div>
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
});