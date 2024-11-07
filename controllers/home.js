const homeRoute = (req, res) => {
    res.status(200).json({ message: 'Welcome to the Booklist API! To start go to : http://localhost:8080/books ' });
};

module.exports = {
    homeRoute,
};
