  ${function transformFonts(allFonts){return allFonts=__WEBPACK_IMPORTED_MODULE_1_lodash_omitBy___default()(allFonts,(_,key)=>"production"===NODE_ENV&&STORYBOOK_ENV&&COPYRIGHTED_FONTS.includes(key)),Object.keys(allFonts).map(name=>allFonts[name].map(f=>Object(__WEBPACK_IMPORTED_MODULE_2__helpers__.c)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}({name:name},f))).join("\n")).join("\n")}({"Open Sans":[{style:"normal",weight:700,file:"opensans/OpenSans-Bold"},{style:"normal",weight:800,file:"opensans/OpenSans-ExtraBold"},{style:"normal",weight:300,file:"opensans/OpenSans-Light"},{style:"normal",weight:400,file:"opensans/OpenSans-Regular"},{style:"normal",weight:600,file:"opensans/OpenSans-SemiBold"}],"Museo Sans":[{style:"normal",weight:100,file:"museosans/MuseoSans-ExtraLight"},{style:"normal",weight:300,file:"museosans/MuseoSans-Light"},{style:"normal",weight:500,file:"museosans/MuseoSans-Regular"},{style:"normal",weight:700,file:"museosans/MuseoSans-Bold"},{style:"normal",weight:900,file:"museosans/MuseoSans-ExtraBold"}],Rubik:[{style:"normal",weight:500,file:"rubik/Rubik-Regular"}]})};
  ${__WEBPACK_IMPORTED_MODULE_4__reset___default.a};

  .tippy-tooltip {
    background-color: ${__WEBPACK_IMPORTED_MODULE_3__theme__.a.dark};
    border-radius: ${__WEBPACK_IMPORTED_MODULE_3__theme__.e[1]}px;
  }

  .tippy-popper .tippy-roundarrow {
    fill: ${__WEBPACK_IMPORTED_MODULE_3__theme__.a.dark};
  }

  .select__control:hover, .select__control-is-focused {
    border-color: ${__WEBPACK_IMPORTED_MODULE_3__theme__.a.fog};
  }

  .select__single-value {
    color: inherit !important;
    right: 0;
    left: 15px;
  }

  .select__placeholder {
    color ${__WEBPACK_IMPORTED_MODULE_3__theme__.a.fog} !important;
  }

  .select__option:active {
    background: ${__WEBPACK_IMPORTED_MODULE_3__theme__.a.lightGrey} !important;
  }

  ::selection {
    background: ${Object(__WEBPACK_IMPORTED_MODULE_2__helpers__.f)(__WEBPACK_IMPORTED_MODULE_3__theme__.a.wallet,.1)};
  }