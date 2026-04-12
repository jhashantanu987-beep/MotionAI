'use client'

import { useState } from 'react'

interface DataPoint {
  date: string
  operations: number | null
  dataTransfer: number | null
}

const data: DataPoint[] = [
  { date: '28 Jun', operations: 0.65, dataTransfer: 0.45 },
  { date: '29 Jun', operations: 0.72, dataTransfer: null },
  { date: '30 Jun', operations: 0.58, dataTransfer: 0.32 },
  { date: '1 Jul', operations: 0.87, dataTransfer: 0.61 },
  { date: '2 Jul', operations: 0.74, dataTransfer: null },
  { date: '3 Jul', operations: 0.81, dataTransfer: 0.55 },
]

export default function WorkspaceNav() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)

  const BAR_WIDTH = 18
  const BAR_GAP = 6
  const GROUP_GAP = 28
  const CHART_HEIGHT = 200
  const MAX_VALUE = 1.0
  const Y_LABELS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

  const getBarY = (value: number | null) => {
    if (value === null) return CHART_HEIGHT
    return CHART_HEIGHT - (value / MAX_VALUE) * CHART_HEIGHT
  }

  const getBarPath = (x: number, y: number, height: number) => {
    const radius = BAR_WIDTH / 2
    const barX = x
    const barTopY = y
    const barBottomY = y + height

    return `
      M ${barX + radius} ${barTopY}
      L ${barX + BAR_WIDTH - radius} ${barTopY}
      Q ${barX + BAR_WIDTH} ${barTopY} ${barX + BAR_WIDTH} ${barTopY + radius}
      L ${barX + BAR_WIDTH} ${barBottomY - radius}
      Q ${barX + BAR_WIDTH} ${barBottomY} ${barX + BAR_WIDTH - radius} ${barBottomY}
      L ${barX + radius} ${barBottomY}
      Q ${barX} ${barBottomY} ${barX} ${barBottomY - radius}
      L ${barX} ${barTopY + radius}
      Q ${barX} ${barTopY} ${barX + radius} ${barTopY}
      Z
    `
  }

  return (
    <div className="flex justify-center mt-6 px-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-full max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>

        <div className="flex gap-8 overflow-x-auto pb-4">
          {/* Y-Axis */}
          <div className="flex flex-col justify-between text-xs text-gray-500 flex-shrink-0">
            {Y_LABELS.slice().reverse().map((label) => (
              <div key={label} className="h-px">
                {label.toFixed(1)}
              </div>
            ))}
          </div>

          {/* Chart */}
          <svg width={650} height={CHART_HEIGHT + 40} viewBox={`0 0 650 ${CHART_HEIGHT + 40}`} className="flex-shrink-0">
            {/* Horizontal Gridlines */}
            {Y_LABELS.map((label) => {
              const y = CHART_HEIGHT - (label / MAX_VALUE) * CHART_HEIGHT
              return (
                <line
                  key={`grid-${label}`}
                  x1="40"
                  y1={y}
                  x2="620"
                  y2={y}
                  stroke="#e5e7eb"
                  strokeDasharray="4,4"
                  opacity="0.15"
                />
              )
            })}

            {/* Bars and Labels */}
            {data.map((point, groupIdx) => {
              const baseX = 40 + groupIdx * (BAR_WIDTH * 2 + BAR_GAP + GROUP_GAP)

              return (
                <g key={`group-${groupIdx}`}>
                  {/* Operations Bar */}
                  {point.operations !== null ? (
                    <>
                      <path
                        d={getBarPath(baseX, getBarY(point.operations), (point.operations / MAX_VALUE) * CHART_HEIGHT)}
                        fill="#3b82f6"
                        opacity="0.8"
                        onMouseEnter={() => setHoveredBar(`ops-${groupIdx}`)}
                        onMouseLeave={() => setHoveredBar(null)}
                        style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                      />
                      {(hoveredBar === `ops-${groupIdx}` || (groupIdx === 3)) && (
                        <g>
                          <rect
                            x={baseX - 8}
                            y={getBarY(point.operations) - 28}
                            width="32"
                            height="20"
                            rx="10"
                            fill="#111827"
                          />
                          <text
                            x={baseX + 1}
                            y={getBarY(point.operations) - 12}
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                            fontWeight="bold"
                          >
                            {Math.round(point.operations * 100)}%
                          </text>
                        </g>
                      )}
                    </>
                  ) : (
                    <rect
                      x={baseX}
                      y={0}
                      width={BAR_WIDTH}
                      height={CHART_HEIGHT}
                      fill="none"
                      stroke="#ccc"
                      strokeDasharray="4,4"
                      rx={BAR_WIDTH / 2}
                      opacity="0.5"
                    />
                  )}

                  {/* Data Transfer Bar */}
                  {point.dataTransfer !== null ? (
                    <>
                      <path
                        d={getBarPath(
                          baseX + BAR_WIDTH + BAR_GAP,
                          getBarY(point.dataTransfer),
                          (point.dataTransfer / MAX_VALUE) * CHART_HEIGHT
                        )}
                        fill="#8b5cf6"
                        opacity="0.8"
                        onMouseEnter={() => setHoveredBar(`dt-${groupIdx}`)}
                        onMouseLeave={() => setHoveredBar(null)}
                        style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                      />
                      {(hoveredBar === `dt-${groupIdx}` || (groupIdx === 2)) && (
                        <g>
                          <rect
                            x={baseX + BAR_WIDTH + BAR_GAP - 8}
                            y={getBarY(point.dataTransfer) - 28}
                            width="32"
                            height="20"
                            rx="10"
                            fill="#111827"
                          />
                          <text
                            x={baseX + BAR_WIDTH + BAR_GAP + 1}
                            y={getBarY(point.dataTransfer) - 12}
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                            fontWeight="bold"
                          >
                            {Math.round(point.dataTransfer * 100)}%
                          </text>
                        </g>
                      )}
                    </>
                  ) : (
                    <rect
                      x={baseX + BAR_WIDTH + BAR_GAP}
                      y={0}
                      width={BAR_WIDTH}
                      height={CHART_HEIGHT}
                      fill="none"
                      stroke="#ccc"
                      strokeDasharray="4,4"
                      rx={BAR_WIDTH / 2}
                      opacity="0.5"
                    />
                  )}

                  {/* Date Label */}
                  <text
                    x={baseX + BAR_WIDTH / 2 + (BAR_WIDTH + BAR_GAP) / 2}
                    y={CHART_HEIGHT + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#999"
                  >
                    {point.date}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-sm border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">Operations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-600">Data Transfer</span>
          </div>
        </div>
      </div>
    </div>
  )
}
