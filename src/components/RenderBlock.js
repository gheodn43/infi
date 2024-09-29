export default function RenderBlock(layoutSetting) {
    const layoutType = layoutSetting.layoutSetting.layoutType;
    const alignment = layoutSetting.layoutSetting.alignment;
    const blocks = layoutSetting.layoutSetting.blocks;
    const validBlocks = Array.isArray(blocks) ? blocks : [];

    let alignItem;
    switch (alignment) {
        case 'left':
            alignItem = 'start'
            break;
        case 'center':
            alignItem = 'center'
            break;
        default:
            alignItem = 'end'
            break;
    }
    const flexDirection = layoutType === 'vertically' ? 'column' : 'row';
    return (
        <div style={{ display: 'flex', flexDirection: flexDirection, alignItems: alignItem, flexWrap: 'wrap' }}>
            {validBlocks.map((block, index) => (
                <div key={index} style={{ width: block.width, textAlign: alignment, padding: '2px' }}>
                    <div className="bg-secondary rounded-3 px-2">
                        @{block.property}
                    </div>
                </div>
            ))}
        </div>
    );
}
