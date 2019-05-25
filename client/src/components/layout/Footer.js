import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark text-white mt-5 p-3 text-center">
                Copyright &copy; {new Date().getFullYear()} Do-Things
            </footer>
        );
    }
}

export default Footer;