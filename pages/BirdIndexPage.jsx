import { Link } from "react-router-dom";
import worldImg from "../src/assets/world-pin.svg";
function BirdIndexPage({ birdList }) {
  if (birdList) {
    birdList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }

  return (
    <>
      <div className="BirdIndexPage container">
        <h3>Bird index page</h3>
        <div className="card-container bird-index-page">
          {birdList &&
            birdList.map((bird) => {
              console.log(bird);
              return (
                <div className="observation-card" key={bird._id}>
                  <Link to={`/birds/${bird._id}`}>
                    <img src={bird.image}></img>
                  </Link>
                  <div className="info-summary">
                    <h4>{bird.name}</h4>
                    <p>
                      <em>{bird.sciName}</em>
                    </p>
                    <p>{bird.habitat}</p>
                    <div class="region-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                      >
                        <g transform="translate(0 0)">
                          <g
                            className="nc-icon-wrapper"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            fill="none"
                            stroke="#f2f2f2"
                          >
                            <polyline
                              data-cap="butt"
                              points="7.579 5.815 9.689 8.277 11.431 10.456 11.256 13.45 7.77 14.096 5.314 17 6.459 19.377 7.565 21.359 10.172 23.378 8.464 25.97 6.172 26.971"
                            ></polyline>
                            <polyline
                              data-cap="butt"
                              points="15.461 31 16.6 28.442 15.582 24.892 17.044 21.049 21.26 20.265 24.824 21.773 27.427 25.091"
                            ></polyline>
                            <path
                              data-cap="butt"
                              d="M29.678,14A13.989,13.989,0,1,1,18.286,3.186"
                            ></path>
                            <circle
                              cx="23"
                              cy="7"
                              r="2"
                              stroke="#f2f2f2"
                            ></circle>
                            <path
                              d="M29,6.844C29,10.451,23,16,23,16s-6-5.549-6-9.156A5.874,5.874,0,0,1,23,1,5.874,5.874,0,0,1,29,6.844Z"
                              stroke="#f2f2f2"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      {bird.region}
                    </div>
                    <div className="more-info">
                      <Link to={`/birds/${bird._id}`}>
                        More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                        >
                          <g className="nc-icon-wrapper" fill="currentColor">
                            <path
                              d="M4.781.375a1,1,0,0,0-1.562,1.25L6.719,6l-3.5,4.375a1,1,0,0,0,1.562,1.25l4-5a1,1,0,0,0,0-1.25Z"
                              fill="currentColor"
                            ></path>
                          </g>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default BirdIndexPage;
