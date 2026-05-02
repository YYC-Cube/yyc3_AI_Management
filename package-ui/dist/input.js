'use strict';

var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var inputVariants = classVarianceAuthority.cva(
  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive",
        success: "border-green-500"
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default"
    }
  }
);
var Input = React__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant,
      inputSize,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "inputSize",
      "label",
      "error",
      "helperText",
      "leftIcon",
      "rightIcon",
      "id"
    ]);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(
        "label",
        {
          htmlFor: inputId,
          className: "mb-2 block text-sm font-medium leading-none",
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex items-center", children: [
        leftIcon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute left-3 flex items-center text-muted-foreground", children: leftIcon }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          __spreadValues({
            id: inputId,
            className: cn(
              inputVariants({ variant, inputSize, className }),
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : ""
            ),
            ref
          }, props)
        ),
        rightIcon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute right-3 flex items-center text-muted-foreground", children: rightIcon })
      ] }),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 text-sm text-destructive", children: error }),
      !error && helperText && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: helperText })
    ] });
  }
);
Input.displayName = "Input";

exports.Input = Input;
exports.inputVariants = inputVariants;
//# sourceMappingURL=input.js.map
//# sourceMappingURL=input.js.map