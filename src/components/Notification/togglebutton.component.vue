<template>
    <div>
      <label :class="{'switch3': true, 'switch3-checked': isChecked}">
        <input type="checkbox" v-model="isChecked" />
        <div></div>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isChecked: true // Initial state
      };
    }
  };
  </script>
  
  <style scoped>
  .switch3 {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 35px;
    border-radius: 37px;
    background-color: #f3f4f4;
    cursor: pointer;
    transition: all 0.3s;
    overflow: hidden;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }
  .switch3 input {
    display: none;
  }
  .switch3 input:checked + div {
    left: calc(80px - 39px);
    box-shadow: 0px 0px 0px white;
  }
  .switch3 div {
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 27px;
    background-color: white;
    top: 5px;
    left: 5px;
    box-shadow: 0px 0px 1px rgb(150, 150, 150);
    transition: all 0.3s;
  }
  .switch3 div:before,
  .switch3 div:after {
    position: absolute;
    content: 'ON';
    width: calc(80px - 52px);
    height: 37px;
    line-height: 37px;
    font-size: 14px;
    font-weight: bold;
    top: -5px;
  }
  .switch3 div:before {
    content: 'OFF';
    color: rgb(120, 120, 120);
    left: 123%;
  }
  .switch3 div:after {
    content: 'ON';
    right: 100%;
    color: white;
  }
  
  .switch3-checked {
    background-color: var(--primary-color);
    box-shadow: none;
  }
  </style>
  