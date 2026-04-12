'use client'

interface AvatarGroupProps {
  members: {
    id: number
    initial: string
    name: string
    color: string
  }[]
  max?: number
}

export default function AvatarGroup({ members, max = 4 }: AvatarGroupProps) {
  const displayMembers = members.slice(0, max)
  const remaining = members.length - max

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayMembers.map((member) => (
          <div
            key={member.id}
            className={`${member.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white cursor-pointer hover:z-10 transition-transform hover:scale-110`}
            title={member.name}
          >
            {member.initial}
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <div className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
          +{remaining}
        </div>
      )}
    </div>
  )
}
