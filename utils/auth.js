const setAuthCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
}

module.exports = { setAuthCookie };