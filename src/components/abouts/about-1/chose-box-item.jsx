export default function ChoseBox ({color,icon,title,subtitle}) {
    return (
        <div className="col-lg-4" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
            <div className={`why-choose-box features-box ${color}`}>
                <div className="icon">
                    <i className={`icon-${icon}`}></i>
                </div>
                <div className="content">
                    <h4 className="title">{title}</h4>
                    <p>{subtitle}</p>
                </div>
            </div>
        </div>
    )
}