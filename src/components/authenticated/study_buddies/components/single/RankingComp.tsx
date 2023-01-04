import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useFetchRankings<T>(endpoint: string){
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        // reset the error each time we make a request
        setIsLoading(true);
        setError(null);

        axios.get(endpoint)
            .then(({ data }) => {
                // we return two things : the status and the link to redirect to :)
                if (data) {
                    setData(data);
                    return;
                }

                throw new Error("Unexpected error while creating paper link");
            })
            .catch((error: Error) => setError(error.message))
        .finally(() => setIsLoading(false))
    }, [])

    return { error, isLoading, data }
}

interface IRanking {
    student: {
        firstname: string
        lastname: string
        profilePic: string
    },

    score: string
    submittedOn: string
}

const RankingsComp = () => {
    const { studyBuddyReference } = useParams();

    const {
        error,
        isLoading,
        data
    } = useFetchRankings<{ rankings: IRanking[] }>(`/study-buddy/rankings/${studyBuddyReference}`);

    return (
        <>
            {error ? <div className="row" style={{
                borderLeft: "2px solid red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                padding: "10px"
            }}>
                {error}
            </div>
                :
                <div>
           {
               isLoading ? <p>fetching rankings...</p>
               :
               <table className="highlight responsive-table">
               <thead>
                   <tr>
                       <th>Position</th>
                       <th>Avatar</th>
                       <th>Fullname</th>
                       <th>Score</th>
                       <th>Submitted</th>
                   </tr>
               </thead>

               <tbody>
                   {
                       data ? data.rankings.map((ranking, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>
                                <img 
                                    className="img-responsive"
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        border: "1px solid #d3d3d3",
                                        borderRadius: "50%"
                                    }}
                                    src={ranking.student.profilePic || "https://previews.123rf.com/images/grgroup/grgroup1809/grgroup180902463/110283517-boy-cartoon-face-icon-kid-child-little-and-people-theme-isolated-design-vector-illustration.jpg"} 
                                    alt="a child profile picture" 
                                />
                            </td>
                            <td>{ranking.student.firstname} {ranking.student.lastname}</td>
                            <td>{ranking.score}%</td>
                            <td>{ranking.submittedOn}</td>
                        </tr>
                       ))
                       : <p>There aent any rankings found</p>
                   }
               </tbody>
           </table>
           }
        </div>
            }
        </>
    )
}

export default RankingsComp;