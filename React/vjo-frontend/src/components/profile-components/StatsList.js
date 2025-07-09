import StatsItem from './StatsItem'
import './styles/StatsList.css'
const StatsList = ({data}) => {

    
    return (
        <div className="stats-list">
            <div className="my-stats">
                <span>My Stats</span>
            </div>
            <div className="last-four-weeks">
                <h2>Last 4 weeks</h2>
                <ul className="last-four-weeks-list">
                    <StatsItem label = {'Activities / Week'} value = {``}/>
                    <StatsItem label = {`Avg Distance / Week`} value = {``}/>
                    <StatsItem label = {`Elev Gain / Week`} value = {``}/>
                    <StatsItem label = {`Avg Time / Week`} value = {``}/>
                </ul>
            </div>
            <div className="best-efforts-wrapper">
                <h2>Best efforts</h2>
                <ul >
                    <StatsItem label = {`Longest Ride`} value = {``}/>
                    <StatsItem label = {`Biggest Climb`} value = {``}/>
                    <StatsItem label = {`Elevation Gain`} value = {``}/>
                    <StatsItem label = {`10K`} value = {``}/>
                    <StatsItem label = {`20K`} value = {``}/>
                    <StatsItem label = {`30K`} value = {``}/>
                    <StatsItem label = {`40K`} value = {``}/>
                    <StatsItem label = {`50K`} value = {``}/>
                </ul>
                
            </div>
            <div className='best-yealy-efforts'>
                <h2>2025</h2>
                <ul>
                    <StatsItem label = {`Activities`} value = {``}/>
                    <StatsItem label = {`Distance`} value = {``}/>
                    <StatsItem label = {`Elev Gain`} value = {``}/>
                    <StatsItem label = {`Time`} value = {``}/>
                </ul>
            </div>

            <div className='all-time-best-stats'>
                <h2>All-Time</h2>
                <ul>
                    <StatsItem label = {`Activities`} value = {``}/>
                    <StatsItem label = {`Distance`} value = {``}/>
                    <StatsItem label = {`Elev Gain`} value = {``}/>
                    <StatsItem label = {`Time`} value = {``}/>
                </ul>
            </div>
        </div>
    )
}
export default StatsList;