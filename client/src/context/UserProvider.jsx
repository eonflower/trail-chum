import React, {useState} from 'react'
import axios from 'axios'

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
		trails: [],
		notes: [],
		errMsg: ""
	}

	const [userState, setUserState] = useState(initState)

	const signup = (credentials) => {
		axios.post('/proxy/auth/signup', credentials)
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
		axios.post('/proxy/auth/login', credentials)
		.then(res => {
			const {user, token} = res.data 
			localStorage.setItem("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			getAllNotes()
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

	const getSoloNote = (id) => {
		return new Promise((resolve, reject) => {
			userAxios
				.get(`/proxy/api/notes/${id}`)
				.then((res) => {
					const soloNote = res.data;
					setUserState((prevState) => ({
						...prevState,
						notes: [soloNote], // Update notes state with an array containing the solo note
					}));
					resolve(soloNote); // Resolve the promise with the solo note data
				})
				.catch((err) => {
					console.log(err.response.data.errMsg);
					reject(err); // Reject the promise with the error
				});
		});
	};

	const getAllNotes = () => {
    userAxios
      .get('/proxy/api/notes')
      .then((res) => {
        const sortedNotes = res.data.sort((a, b) => a.dayNumber - b.dayNumber);
        setUserState((prevState) => ({
          ...prevState,
          notes: sortedNotes.filter((note) => note.user === userState.user._id), // Filter notes by user
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

	const getTrailNotes = (id) => {
    userAxios
      .get(`/proxy/api/notes/trail/${id}`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          notes: res.data.filter((note) => note.user === userState.user._id), // Filter notes by user
        }));
      })
      .catch((err) => {
        console.log(err.response.data.errMsg);
      });
  };



	const getAllTrails = () => {
    userAxios
      .get("/proxy/api/trails/user")
      .then((res) => {
        const trails = res.data.filter((trail) => trail.user === userState.user._id); // Filter trails by user
        const trailIds = trails.map((trail) => trail._id);
        
        // Fetch notes for each trail
        const fetchTrailNotesPromises = trailIds.map((trailId) =>
          userAxios.get(`/proxy/api/notes/trail/${trailId}`)
        );

        // Execute all requests concurrently
        Promise.all(fetchTrailNotesPromises)
          .then((responses) => {
            const updatedTrails = trails.map((trail, index) => ({
              ...trail,
              notes: responses[index].data.filter((note) => note.user === userState.user._id), // Filter notes by user
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


	const addNote = (newNote) => {
		const { trails } = userState;
		userAxios
			.post("/proxy/api/notes", { ...newNote, trails: trails._id })
			.then((res) => {
				setUserState((prevState) => {
					const updatedTrails = prevState.trails.map((trail) => {
						if (trail._id === trails._id) {
							return {
								...trail,
								notes: [...trail.notes, res.data],
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
					notes: [...trails.notes, res.data._id],
				};
				userAxios
					.put(`/proxy/api/trails/${trails._id}`, updatedTrail)
					.then((res) => {
						console.log(res)
						setUserState((prevState) => {
							const updatedTrails = prevState.trails.map((trail) => {
								if (trail._id === trails._id) {
									return {
										...trail,
										notes: [...trail.notes, res.data],
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
		const { user } = userState;
		userAxios.post("/proxy/api/trails", {...newTrail, user: user._id})
		.then(res => 
			setUserState(prevState => ({
			...prevState,
			trails: [...prevState.trails, res.data]
		})))
		.catch(err => console.log(err.response.data.errMsg))
		
	}

	
  const updateNote = (noteId, updatedNote) => {
    userAxios
      .put(`/proxy/api/notes/${noteId}`, updatedNote)
      .then((res) => {
        const updatedNotes = userState.notes.map((note) => {
          if (note._id === noteId) {
            return res.data;
          }
          return note;
        });
        setUserState((prevState) => ({
          ...prevState,
          notes: updatedNotes,
        }));
        console.log('Note updated successfully');
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  const deleteTrail = (id) => {
		const confirmDelete = window.confirm("Are you sure you want to delete this trail and all its associated logs?");
	
		if (confirmDelete) {
			return new Promise((resolve, reject) => {
				userAxios
					.delete(`/proxy/api/trails/${id}`)
					.then((res) => {
						resolve();
					})
					.catch((err) => {
						reject(err);
						console.log(err.response.data.errMsg);
					});
			});
		} else {
			return Promise.reject('Trail deletion canceled');
		}
	};

const deleteNote = (id) => {
  return new Promise((resolve, reject) => {
    userAxios
      .delete(`/proxy/api/notes/${id}`)
      .then((res) => {
        setUserState((prevState) => {
          // Remove the deleted note from the notes array
          const updatedNotes = prevState.notes.filter((note) => note._id !== id);

          // Remove the deleted note from the corresponding trail array
          const updatedTrails = prevState.trails.map((trail) => {
            return {
              ...trail,
              notes: trail.notes.filter((note) => note._id !== id),
            };
          });

          return {
            ...prevState,
            notes: updatedNotes,
            trails: updatedTrails,
          };
        });

        console.log('Note deleted successfully');
        resolve(); // Resolve the Promise on successful deletion
      })
      .catch((err) => {
        console.log(err.response.data.errMsg);
        reject(err); // Reject the Promise on error
      });
  });
};



	
	return(
		<UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addNote,
				updateNote,
				deleteNote,
				deleteTrail,
        addTrail,
        getAllNotes,
				getSoloNote,
				getTrailNotes,
        getAllTrails,
        resetAuthErr,
      }}
    >
      {props.children}
    </UserContext.Provider>
	)
}