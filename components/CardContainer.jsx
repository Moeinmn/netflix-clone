import  styles  from "./CardContainer.module.css";
import Card from './Card'

const CardContainer = ({title , dataArray = [] , cardSize }) => {
    return ( 
        <>
        <section className={styles.container}>
            <h3>{title}</h3>
            <div style={{width:'max-content' , padding:'22px 0px 22px 10px'}}>
            {
                dataArray.map((movie , indx)=>{if(movie?.id?.videoId || movie?.id) return <Card size={cardSize} imgUrl={`https://i.ytimg.com/vi/${movie?.id?.videoId|| movie?.id}/maxresdefault.jpg`} videoId={ movie?.id?.videoId|| movie?.id } key={indx}/>})
            }
            </div>
        </section>
        </>
     );
}
 
export default CardContainer;