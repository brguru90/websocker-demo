import React, {Component} from "react"
import "./App.scss"
import {BrowserRouter as Router, HashRouter, Switch, Route} from "react-router-dom"
import * as $ from "jquery"
import Page1 from "./components/page1/page1.jsx"
import Page2 from "./components/page2/page2.jsx"

export default class App extends Component {
    componentDidMount() {
        let timeout = setTimeout(() => {
            $(".App").addClass("loaded")
            clearTimeout(timeout)
        }, 1000)
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <HashRouter>
                        <Switch>
                            <Route path="/" exact component={Page1} />
                            <Route path="/page2" component={Page2} />
                            {/* <Route component={Error} /> */}
                        </Switch>
                    </HashRouter>
                </Router>
            </div>
        )
    }
}
