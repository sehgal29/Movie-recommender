// import React, { useState } from "react";
// import axios from "axios";
// import Search from "./components/Search";
// import Detail from "./components/Detail";
// import "./App.css";

// function App() {
//     const [state, setState] = useState({
//         s: "sherlock",
//         results: [],
//         selected: {},
//     });

//     const apiurl =
//         "https://www.omdbapi.com/?apikey=a2526df0";

//     const searchInput = (e) => {
//         let s = e.target.value;

//         setState((prevState) => {
//             return { ...prevState, s: s };
//         });
//     };

//     const search = (e) => {
//         if (e.key === "Enter") {
//             axios(apiurl + "&s=" + state.s).then(
//                 ({ data }) => {
//                     let results = data.Search;

//                     console.log(results);

//                     setState((prevState) => {
//                         return {
//                             ...prevState,
//                             results: results,
//                         };
//                     });
//                 }
//             );
//         }
//     };

//     const openDetail = (id) => {
//         axios(apiurl + "&i=" + id).then(({ data }) => {
//             let result = data;

//             setState((prevState) => {
//                 return { ...prevState, selected: result };
//             });
//         });
//     };

//     const closeDetail = () => {
//         setState((prevState) => {
//             return { ...prevState, selected: {} };
//         });
//     };

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Movie Mania</h1>
//             </header>
//             <main>
//                 <Search
//                     searchInput={searchInput}
//                     search={search}
//                 />

//                 <div className="container">
//                     {state.results.map((e) => (
//                         <div
//                             className="item"
//                             onClick={() =>
//                                 openDetail(e.imdbID)
//                             }
//                         >
//                             <img
//                                 style={{ width: "200px" }}
//                                 src={e.Poster}
//                             />
//                             <h3 style={{ color: "white" }}>
//                                 {e.Title}
//                             </h3>
//                         </div>
//                     ))}
//                 </div>

//                 {typeof state.selected.Title !=
//                 "undefined" ? (
//                     <Detail
//                         selected={state.selected}
//                         closeDetail={closeDetail}
//                     />
//                 ) : (
//                     false
//                 )}
//             </main>
//         </div>
//     );
// }

// export default App;

// App.js
import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Detail from "./components/Detail";
import Favorites from "./components/Favorites"; // New Component
import NavBar from "./components/NavBar"; // New Component
import Loader from "./components/Loader"; // New Component
import Footer from "./components/Footer"; // New Component
import "./App.css";

function App() {
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {},
        favorites: [], // New State for Favorites
        loading: false, // Loader State
    });

    const apiurl = "https://www.omdbapi.com/?apikey=a2526df0";

    const searchInput = (e) => {
        const s = e.target.value;
        setState((prevState) => ({ ...prevState, s }));
    };

    const search = (e) => {
        if (e.key === "Enter") {
            setState((prevState) => ({ ...prevState, loading: true })); // Show Loader
            axios(apiurl + "&s=" + state.s).then(({ data }) => {
                const results = data.Search || [];
                setState((prevState) => ({
                    ...prevState,
                    results,
                    loading: false, // Hide Loader
                }));
            });
        }
    };

    const openDetail = (id) => {
        axios(apiurl + "&i=" + id).then(({ data }) => {
            setState((prevState) => ({
                ...prevState,
                selected: data,
            }));
        });
    };

    const closeDetail = () => {
        setState((prevState) => ({
            ...prevState,
            selected: {},
        }));
    };

    const addToFavorites = (movie) => {
        setState((prevState) => ({
            ...prevState,
            favorites: [...prevState.favorites, movie],
        }));
    };

    return (
        <div className="App">
            <NavBar /> {/* New NavBar Component */}
            <header className="App-header">
                <h1>CineMagic</h1>
            </header>
            <main>
                <Search searchInput={searchInput} search={search} />
                {state.loading ? (
                    <Loader /> // Loader Component
                ) : (
                    <div className="container">
                        {state.results.length > 0 ? (
                            state.results.map((movie) => (
                                <div className="item" key={movie.imdbID}>
                                    <img
                                        style={{ width: "200px" }}
                                        src={movie.Poster}
                                        alt={movie.Title}
                                        onClick={() => openDetail(movie.imdbID)}
                                    />
                                    <h3>{movie.Title}</h3>
                                    <button
                                        onClick={() => addToFavorites(movie)}
                                        className="favorite-btn"
                                    >
                                        Add to Favorites
                                    </button>
                                </div>
                            ))
                        ) : (
                            <h2>No Results Found</h2>
                        )}
                    </div>
                )}
                {state.selected.Title && (
                    <Detail selected={state.selected} closeDetail={closeDetail} />
                )}
            </main>
            <Favorites favorites={state.favorites} /> {/* Favorites Section */}
            <Footer /> {/* Footer Component */}
        </div>
    );
}

export default App;