# NgScatterDirectionalChart

```scss
@import './../node_modules/tippy.js/dist/tippy.css';
@import './../node_modules/tippy.js/themes/light.css';
@import './../node_modules/tippy.js/animations/scale.css';


.tippy-content {
  position: relative;
}

.tippy-close {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 9px;
  right: 9px;
  fill: rgb(158, 160, 165);
  cursor: pointer;
  z-index: 1;
}

.tippy-box {
  border-radius: 4px;
  font-size: 11px;

  .tippy-content {
    padding: 4px 6px;
  }
}

.tippy-box[data-theme~='light'] {
  font-size: 12px;
  word-break: break-word;
  border-radius: 0;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.2);
  color: rgb(79, 80, 83);
  width: 350px;

  .tippy-content {
    padding: 13px 20px 13px 20px;
  }
}

.tippy-arrow::before {
  box-shadow: -4px 4px 14px -4px rgba(0, 0, 0, 0.2);
}



.sg-hp-custom {
  .tippy-box {
    border-radius: 5px !important;
  }

  .tippy-close {
    display: none !important;
  }
  .tippy-arrow {
    display: none;
  }
}

```
