import './styles/StatsItem.css'
const StatsItem = ({label}) =>{
    const value = '---------'
    return (
        <li className="stat">
            <span className="static-text">{label}</span>
            <span className="dynamic-text">{value}</span>
        </li>
    )
}
export default StatsItem;