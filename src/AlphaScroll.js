import React, { PureComponent } from "react";
import { lorem } from "./lorem";

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

class AlphaScroll extends PureComponent {
  alphaScrollRefs = [];
  sectionRefs = [];

  clickScroll = e => {
    const index = e.target.dataset.index;
    const targetSection = this.sectionRefs[index];
    targetSection.scrollIntoView();
  };

  dragScroll = e => {
    const xCoord = e.touches ? e.touches[0].clientX : e.clientX;
    const yCoord = e.touches ? e.touches[0].clientY : e.clientY;
    const letterCoords = this.alphaScrollRefs.map(letter => {
      const rect = letter.getBoundingClientRect();
      return [rect.x, (rect.top + rect.bottom) / 2];
    });
    const distances = [];
    letterCoords.forEach(letter => {
      const distance = Math.hypot(letter[0] - xCoord, letter[1] - yCoord);
      distances.push(distance);
    });
    const closestLetterIndex = distances.indexOf(Math.min(...distances));
    const targetSection = this.sectionRefs[closestLetterIndex];
    targetSection.scrollIntoView();
  };

  loremIpsum = () => {
    return Math.floor(Math.random() * (lorem.length - 50 + 1) + 50);
  };

  sectionRefsCallback = e => {
    const index = e.dataset.index;
    this.sectionRefs[index] = e;
  };

  renderSections = () => {
    return alphabet.map((letter, index) => {
      return (
        <div
          key={index}
          data-index={index}
          ref={this.sectionRefsCallback}
          style={{ width: "85vw" }}
        >
          <div style={{ background: "grey", color: "white", paddingLeft: 10 }}>
            {letter}
          </div>
          <p>{lorem.substring(0, this.loremIpsum())}</p>
        </div>
      );
    });
  };

  alphaScrollRefsCallback = e => {
    const index = e.dataset.index;
    this.alphaScrollRefs[index] = e;
  };

  renderScroll = () => {
    return alphabet.map((letter, index) => {
      return (
        <li
          key={index}
          style={{
            listStyle: "none",
            fontSize: 14,
            width: 40,
            textAlign: "center"
          }}
          data-index={index}
          ref={this.alphaScrollRefsCallback}
          onClick={this.clickScroll}
          onTouchStart={this.clickScroll}
          onTouchMove={this.dragScroll}
        >
          {letter}
        </li>
      );
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          overflow: "hidden",
          maxHeight: "85vh"
        }}
      >
        <div style={{ overflow: "scroll", paddingRight: "100vw" }}>
          {this.renderSections()}
        </div>
        <ul
          style={{
            position: "fixed",
            top: "5vh",
            right: 0,
            userSelect: "none",
            touchAction: "none"
          }}
        >
          {this.renderScroll()}
        </ul>
      </div>
    );
  }
}

export default AlphaScroll;
