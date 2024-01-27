import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import Spinner from "../components/Spinner";
import {db} from "../firebase";
import {Swiper, SwiperSlide} from "swiper/react";
//import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from "swiper"; //v9
import {EffectFade, Autoplay, Navigation, Pagination} from "swiper/modules";
import "swiper/css/bundle";

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //SwiperCore.use([Autoplay, Navigation, Pagination]); //v9

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setListings(listings);
      setLoading(false);
    }

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{type: "progressbar"}}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          autoplay={{delay: 3000}}
        >
          {listings.map(({data, id}) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover"
                }}
                className="relative w-full h-[300px] lg:h-[450px] overflow-hidden"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#3377cc] shadow-lg
              opacity-90 p-2 pr-3 rounded-br-3xl">
                {data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#D92228] shadow-lg
              opacity-90 p-2 pr-3 rounded-tr-3xl">
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
