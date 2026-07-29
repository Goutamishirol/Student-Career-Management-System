function DashboardCard({icon,title,count,color}){

return(

<div className={`dashboard-card dashboard-card-${color}`}>


<div className="card-icon">

{icon}

</div>


<h3>
{title}
</h3>


<h1>
{count}
</h1>


</div>


)

}


export default DashboardCard;