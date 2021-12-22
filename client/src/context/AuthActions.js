/////// LOGIN
export const LoginStart = (userCredentials) => ({
    type:"LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload:user,
});

export const LoginFailure = (error) => ({
    type:"LOGIN_FAILURE",
    payload:error
});

/////// LOGOUT
export const LogoutStart = (userCredentials) => ({
    type:"LOGOUT_START",
});

export const LogoutSuccess = (statusbar) => ({
    type:"LOGOUT_SUCCESS",
    payload: statusbar,
});

export const LogoutFailure = (error) => ({
    type:"LOGOUT_FAILURE",
    payload:error
});


export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

// export const FollowSuccess = (userId) => ({
//     type: "FOLLOW_SUCCESS",
//     payload: userId,
// });

// export const FollowFailure = (error) => ({
//     type: "FOLLOWFAILURE",
//     payload: error,
// });

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});