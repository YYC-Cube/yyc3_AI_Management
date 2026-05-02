import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  return twMerge(clsx(inputs));
}
var Form = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx("form", __spreadValues({ ref, className: cn("space-y-6", className) }, props));
  }
);
Form.displayName = "Form";
var FormItem = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx("div", __spreadValues({ ref, className: cn("space-y-2", className) }, props));
  }
);
FormItem.displayName = "FormItem";
var FormLabel = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx(
      "label",
      __spreadValues({
        ref,
        className: cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )
      }, props)
    );
  }
);
FormLabel.displayName = "FormLabel";
var FormControl = React.forwardRef(
  (_a, ref) => {
    var props = __objRest(_a, []);
    return /* @__PURE__ */ jsx("div", __spreadValues({ ref }, props));
  }
);
FormControl.displayName = "FormControl";
var FormDescription = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "p",
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant = "default", children } = _b, props = __objRest(_b, ["className", "variant", "children"]);
    const body = variant === "destructive" ? /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-destructive", children }) : children;
    return /* @__PURE__ */ jsx(
      "p",
      __spreadProps(__spreadValues({
        ref,
        className: cn("text-sm font-medium", className)
      }, props), {
        children: body
      })
    );
  }
);
FormMessage.displayName = "FormMessage";
var FormFieldContext = React.createContext(
  {}
);
var useFormField = () => {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField should be used within <FormField>");
  }
  return context;
};
var FormField = ({ name, children }) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name }, children });
};
FormField.displayName = "FormField";

export { Form, FormControl, FormDescription, FormField, FormFieldContext, FormItem, FormLabel, FormMessage, useFormField };
//# sourceMappingURL=form.mjs.map
//# sourceMappingURL=form.mjs.map