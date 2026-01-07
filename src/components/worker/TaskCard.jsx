import { Link } from 'react-router-dom'

export default function TaskCard({ task }) {
  return (
    <div className="card bg-base-100 border shadow-sm hover:shadow-md transition-shadow">
      <figure className="h-44 bg-base-200">
        <img
          src={task.taskImageUrl || 'https://i.ibb.co/2nS2d4b/default-user.png'}
          alt={task.taskTitle}
          className="h-44 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h3 className="font-semibold text-lg leading-snug line-clamp-2">
          {task.taskTitle}
        </h3>

        <div className="text-sm text-base-content/70">
          Buyer:{' '}
          <span className="font-medium text-base-content">
            {task.buyerName}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="badge badge-primary badge-outline">
            {task.payableAmount} coins
          </span>
          <span className="badge badge-ghost">
            Slots: {task.requiredWorkers}
          </span>
          <span className="badge badge-outline">
            Deadline: {new Date(task.completionDate).toLocaleDateString()}
          </span>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/dashboard/worker/tasks/${task._id}`}
            className="btn btn-sm btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
