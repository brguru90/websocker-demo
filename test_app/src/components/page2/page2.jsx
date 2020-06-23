import React, { Component } from 'react'
import "./page2.scss"
import * as $ from "jquery"
import small from "../../assets/s.png"

export default class page2 extends Component {


    drawSourceIntoCanvas = async (url, classSelector) => {
        var img = new Image();
        img.src = url;

        return await new Promise((callback) => {
            img.onload = function () {
                let canvasElem = $(`.${classSelector}`)
                if (!canvasElem) {
                    let elem = document.createElement('canvas');
                    canvasElem = $(elem)
                    canvasElem.addClass(classSelector)
                }
                let w = img.width
                let h = img.height
                let ratio = w / h;
                let max_width = 1000
                while (ratio * max_width > 600) {
                    max_width -= 1
                }
                canvasElem.attr("width", ratio * max_width)
                canvasElem.attr("height",)
                let canvas = canvasElem[0]
                let ctxEdited = canvas.getContext('2d');
                ctxEdited.drawImage(img, 0, 0, ratio * max_width, max_width);
                canvasElem.width(ratio * max_width)
                canvasElem.height(max_width)
                callback(url)
            }
        })
    }


    get_img_data = async (url) => {

        var img = new Image();
        img.src = url;
        let ctx = this

        return await new Promise((callback) => {
            img.onload = function () {
                var canvas = document.createElement('canvas');
                let w = img.width
                let h = img.height
                let ctxEdited = canvas.getContext('2d');
                ctxEdited.drawImage(img, 0, 0, w, h);
                let imageData = ctxEdited.getImageData(0, 0, w, h)
                callback({
                    width: w,
                    height: h,
                    imageData: imageData.data,
                    base64: canvas.toDataURL()
                })
            }
        })

    }


    componentDidMount() {
        this.drawSourceIntoCanvas(small, "srcCanvas").then(async (url) => {
            console.log("get_img_data", await this.get_img_data(url))
        })
    }


    render() {
        return (
            <div className="Page2" >

                <div className="flex-container">
                    <div className="box">
                        <canvas className="srcCanvas" width="300" height="200" />
                    </div>

                    <div className="box">

                    </div>

                </div>


            </div>
        )
    }
}
