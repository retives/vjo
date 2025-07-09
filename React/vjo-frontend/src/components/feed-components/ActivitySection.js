import Activity from './Activity.js'
const ActivitySection = ({activities}) => {

    return (
        <div>
            {Array.isArray(activities) && activities.length !== 0 ? (
                activities.map((activity) => (
                    <Activity
                        key={activity.id}
                        activity={activity}
                    />
                ))
            ) : (
                <div>
                    <p>No activities found.</p>
                </div>
                
            )}
      </div>
    )
}
export default ActivitySection;