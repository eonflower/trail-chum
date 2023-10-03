import React, {useState} from 'react'
import axios from 'axios'
// import config from "../utils/config"

// Remember to add in  to the axios requests when in development mode

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
	const token = localStorage.getItem("token")
	config.headers.Authorization = `Bearer ${token}`
	return config
})

export default function UserProvider(props) {
	const initState = { 
		user: JSON.parse(localStorage.getItem("user")) || {}, 
		token: localStorage.getItem("token") || "",
		trails: [{
			logs: [],
		}],
		errMsg: ""
	}
	const [userState, setUserState] = useState(initState)

	const signup = (credentials) => {
		axios.post(`/auth/signup`, credentials)
		.then(res => {
			const {user, token} = res.data
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			setUserState(prevState => ({
				...prevState,
				user,
				token
			}))
		})
		.catch(err => handleAuthErr(err.response.data.errMsg))
	}

	const login = (credentials) => {
		axios.post(`/auth/login`, credentials)
		.then(res => {
			const {user, token} = res.data 
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			getAllLogs()
			setUserState(prevState => ({
				...prevState,
				user,
				token
			}))
		})
		.catch(err => handleAuthErr(err.response.data.errMsg))
	}

	const logout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		setUserState({
			user: {},
			token: "",
			topics: []
		})
	}

	const handleAuthErr = (errMsg) => {
		setUserState(prevState => ({
			...prevState,
			errMsg
		}))
	}

	const resetAuthErr = () => {
		setUserState(prevState => ({
			...prevState,
			errMsg: ""
		}))
	}

	const getUser = (id) => {
    return new Promise((resolve, reject) => {
        userAxios
            .get(`/api/account/${id}`)
            .then((res) => {
                const user = res.data;
                setUserState((prevState) => ({
                    ...prevState,
                    user,
                }));
                resolve(user);
            })
            .catch((err) => {
                console.log(err.response.data.errMsg);
                reject(err);
            });
    });
};

	
	const deleteUser = (id) => {
		const confirmDelete = window.confirm("Are you sure you want to delete your account and all its associated trails and logs? You will not be able to recover this data.");
	
		if (confirmDelete) {
			return new Promise((resolve, reject) => {
				userAxios
					.delete(`/api/account/${id}`)
					.then((res) => {
						const user = res.data;
						resolve(user);
						logout()
						console.log('User deleted successfully');
					})
					.catch((err) => {
						reject(err);
						console.log(err.response.data.errMsg);
					});
			});
		} else {
			return Promise.reject('User deleted successfully');
		}
	};

	const getSoloLog = (id) => {
		return new Promise((resolve, reject) => {
			userAxios
				.get(`/api/logs/${id}`)
				.then((res) => {
					const soloLog = res.data;
					setUserState((prevState) => ({
						...prevState,
						logs: [soloLog], // Update Logs state with an array containing the solo Log
					}));
					resolve(soloLog); // Resolve the promise with the solo Log data
				})
				.catch((err) => {
					console.log(err.response.data.errMsg);
					reject(err); // Reject the promise with the error
				});
		});
	};

	const getAllLogs = () => {
    userAxios
      .get(`/api/logs`)
      .then((res) => {
        const sortedLogs = res.data.sort((a, b) => a.dayNumber - b.dayNumber);
        setUserState((prevState) => ({
          ...prevState,
          logs: sortedLogs.filter((log) => log.user === userState.user._id), // Filter Logs by user
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

	const getTrailLogs = (id) => {
    userAxios
      .get(`/api/logs/trail/${id}`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          logs: res.data.filter((log) => log.user === userState.user._id), // Filter Logs by user
        }));
      })
      .catch((err) => {
        console.log(err.response.data.errMsg);
      });
  };



	const getAllTrails = () => {
    userAxios
      .get(`/api/trails/user`)
      .then((res) => {
        const trails = res.data.filter((trail) => trail.user === userState.user._id); // Filter trails by user
        const trailIds = trails.map((trail) => trail._id);
        
        // Fetch Logs for each trail
        const fetchTrailLogsPromises = trailIds.map((trailId) =>
          userAxios.get(`/api/logs/trail/${trailId}`)
        );

        // Execute all requests concurrently
        Promise.all(fetchTrailLogsPromises)
          .then((responses) => {
            const updatedTrails = trails.map((trail, index) => ({
              ...trail,
              logs: responses[index].data.filter((log) => log.user === userState.user._id), // Filter logs by user
            }));

            setUserState((prevState) => ({
              ...prevState,
              trails: updatedTrails,
            }));
          })
          .catch((err) => console.log(err.response.data.errMsg));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };


	const addLog = (newLog) => {
		const { trails } = userState;
		userAxios
			.post(`/api/logs`, { ...newLog, trails: trails._id })
			.then((res) => {
				setUserState((prevState) => {
					const updatedTrails = prevState.trails.map((trail) => {
						if (trail._id === trails._id) {
							return {
								...trail,
								logs: [...trail.logs, res.data],
							};
						}
						return trail;
					});
					return {
						...prevState,
						trails: updatedTrails,
					};
				});
				const updatedTrail = {
					...trails,
					logs: [...trails.logs, res.data._id],
				};
				userAxios
					.put(`/api/trails/${trails._id}`, updatedTrail)
					.then((res) => {
						console.log(res)
						setUserState((prevState) => {
							const updatedTrails = prevState.trails.map((trail) => {
								if (trail._id === trails._id) {
									return {
										...trail,
										logs: [...trail.logs, res.data],
									}
								}
								return trail;
							});
							return {
								...prevState,
								trails: updatedTrails,
							};
						});
						window.location.reload(); // Reload the page after successful addition
					})
					.catch((err) => console.log(err.response.data.errMsg));
			})
			.catch((err) => console.log(err.response.data.errMsg));
	};
	
	


	const addTrail = (newTrail) => {
		const { user, trails } = userState;
		
		// Check if the trail already exists
		const isTrailExists = trails.some(trail => trail.trailName.toLowerCase() === newTrail.trailName.toLowerCase());
		
		if (isTrailExists) {
			alert("Trail already exists!");
			return;
		}
		
		userAxios.post(`/api/trails`, {...newTrail, user: user._id})
			.then(res => 
				setUserState(prevState => ({
					...prevState,
					trails: [...prevState.trails, res.data]
				})))
			.catch(err => console.log(err.response.data.errMsg));
	}

	
  const updateLog = (logId, updatedLog) => {
    userAxios
      .put(`/api/logs/${logId}`, updatedLog)
      .then((res) => {
        const updatedLogs = userState.logs.map((log) => {
          if (log._id === logId) {
            return res.data;
          }
          return log;
        });
        setUserState((prevState) => ({
          ...prevState,
          logs: updatedLogs,
        }));
        // console.log('Log updated successfully');
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  const deleteTrail = (id) => {
		const confirmDelete = window.confirm("Are you sure you want to delete this trail and all its associated logs?");
	
		if (confirmDelete) {
			return new Promise((resolve, reject) => {
				userAxios
					.delete(`/api/trails/${id}`)
					.then((res) => {
						setUserState((prevState) => {	
							const updatedTrails = prevState.trails.filter((trail) => trail._id !== id);
							return {
								...prevState,
								trails: updatedTrails,
							};
						});
						console.log('Log deleted successfully');
						resolve(); // Resolve the Promise on successful deletion
					})
					.catch((err) => {
						console.log(err.response.data.errMsg);
						reject(err);
					});
			});
		} else {
			return Promise.reject('Trail deletion canceled');
		}
	};

const deleteLog = (id) => {
	const confirmDelete = window.confirm("Are you sure you want to delete this log?");
  
	if (confirmDelete) {
		return new Promise((resolve, reject) => {
			userAxios
				.delete(`/api/logs/${id}`)
				.then((res) => {
					setUserState((prevState) => {
						// Remove the deleted Log from the Logs array
						const updatedLogs = prevState.logs.filter((log) => log._id !== id);
	
						// Remove the deleted Log from the corresponding trail array
						const updatedTrails = prevState.trails.map((trail) => {
							return {
								...trail,
								logs: trail.logs.filter((log) => log._id !== id),
							};
						});
	
						return {
							...prevState,
							logs: updatedLogs,
							trails: updatedTrails,
						};
					});
	
					console.log('Log deleted successfully');
					resolve(); // Resolve the Promise on successful deletion
				})
				.catch((err) => {
					console.log(err.response.data.errMsg);
					reject(err); // Reject the Promise on error
				});
		});
	}
};



	
	return(
		<UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addLog,
				updateLog,
				deleteLog,
				deleteTrail,
        addTrail,
        getAllLogs,
				getSoloLog,
				getTrailLogs,
        getAllTrails,
        resetAuthErr,
				getUser,
				deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
	)
}