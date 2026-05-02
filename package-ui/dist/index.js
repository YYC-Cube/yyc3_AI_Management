'use strict';

var React6 = require('react');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var lucideReact = require('lucide-react');

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

var React6__namespace = /*#__PURE__*/_interopNamespace(React6);

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

// src/design-tokens/tokens.ts
var tokens = {
  colors: {
    brand: {
      primary: "hsl(var(--primary))",
      "primary-foreground": "hsl(var(--primary-foreground))",
      secondary: "hsl(var(--secondary))",
      "secondary-foreground": "hsl(var(--secondary-foreground))",
      accent: "hsl(var(--accent))",
      "accent-foreground": "hsl(var(--accent-foreground))"
    },
    background: {
      DEFAULT: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))"
    },
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))"
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))"
    },
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))"
    }
  },
  spacing: {
    0: "0px",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem"
  },
  borderRadius: {
    sm: "calc(var(--radius) - 4px)",
    DEFAULT: "var(--radius)",
    lg: "calc(var(--radius) + 4px)",
    xl: "calc(var(--radius) + 8px)",
    "2xl": "calc(var(--radius) + 12px)",
    full: "9999px"
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1" }]
  },
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800"
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
};
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "size",
      "loading",
      "leftIcon",
      "rightIcon",
      "children",
      "disabled"
    ]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      __spreadProps(__spreadValues({
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || loading
      }, props), {
        children: [
          loading && /* @__PURE__ */ jsxRuntime.jsxs(
            "svg",
            {
              className: "mr-2 h-4 w-4 animate-spin",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4"
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }
                )
              ]
            }
          ),
          leftIcon && !loading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-2", children: leftIcon }),
          children,
          rightIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-2", children: rightIcon })
        ]
      })
    );
  }
);
Button.displayName = "Button";
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
var Input = React6__namespace.forwardRef(
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
var badgeVariants = classVarianceAuthority.cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white",
        warning: "border-transparent bg-yellow-500 text-black",
        danger: "border-transparent bg-red-500 text-white",
        info: "border-transparent bg-blue-500 text-white",
        purple: "border-transparent bg-purple-500 text-white"
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Badge = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant,
      size,
      removable = false,
      onRemove,
      leftIcon,
      rightIcon,
      children
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "size",
      "removable",
      "onRemove",
      "leftIcon",
      "rightIcon",
      "children"
    ]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(badgeVariants({ variant, size, className }))
      }, props), {
        children: [
          leftIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-1", children: leftIcon }),
          children,
          rightIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-1", children: rightIcon }),
          removable && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                onRemove == null ? void 0 : onRemove();
              },
              className: "ml-1 rounded-full p-0.5 hover:bg-black/10 focus:outline-none",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-3 w-3" })
            }
          )
        ]
      })
    );
  }
);
Badge.displayName = "Badge";
var Card = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      __spreadValues({
        ref,
        className: cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )
      }, props)
    );
  }
);
Card.displayName = "Card";
var CardHeader = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      __spreadValues({
        ref,
        className: cn("flex flex-col space-y-1.5 p-6", className)
      }, props)
    );
  }
);
CardHeader.displayName = "CardHeader";
var CardTitle = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "h3",
      __spreadValues({
        ref,
        className: cn(
          "text-2xl font-semibold leading-none tracking-tight",
          className
        )
      }, props)
    );
  }
);
CardTitle.displayName = "CardTitle";
var CardDescription = React6__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
CardDescription.displayName = "CardDescription";
var CardContent = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx("div", __spreadValues({ ref, className: cn("p-6 pt-0", className) }, props));
  }
);
CardContent.displayName = "CardContent";
var CardFooter = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      __spreadValues({
        ref,
        className: cn("flex items-center p-6 pt-0", className)
      }, props)
    );
  }
);
CardFooter.displayName = "CardFooter";
var Table = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntime.jsx(
      "table",
      __spreadValues({
        ref,
        className: cn("w-full caption-bottom text-sm", className)
      }, props)
    ) });
  }
);
Table.displayName = "Table";
var TableHeader = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "thead",
      __spreadValues({
        ref,
        className: cn("[&_tr]:border-b", className)
      }, props)
    );
  }
);
TableHeader.displayName = "TableHeader";
var TableBody = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "tbody",
      __spreadValues({
        ref,
        className: cn("[&_tr:last-child]:border-0", className)
      }, props)
    );
  }
);
TableBody.displayName = "TableBody";
var TableRow = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "tr",
      __spreadValues({
        ref,
        className: cn(
          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
          className
        )
      }, props)
    );
  }
);
TableRow.displayName = "TableRow";
var TableHead = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "th",
      __spreadValues({
        ref,
        className: cn(
          "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          className
        )
      }, props)
    );
  }
);
TableHead.displayName = "TableHead";
var TableCell = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "td",
      __spreadValues({
        ref,
        className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)
      }, props)
    );
  }
);
TableCell.displayName = "TableCell";
var Form = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx("form", __spreadValues({ ref, className: cn("space-y-6", className) }, props));
  }
);
Form.displayName = "Form";
var FormItem = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx("div", __spreadValues({ ref, className: cn("space-y-2", className) }, props));
  }
);
FormItem.displayName = "FormItem";
var FormLabel = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var FormControl = React6__namespace.forwardRef(
  (_a, ref) => {
    var props = __objRest(_a, []);
    return /* @__PURE__ */ jsxRuntime.jsx("div", __spreadValues({ ref }, props));
  }
);
FormControl.displayName = "FormControl";
var FormDescription = React6__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React6__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant = "default", children } = _b, props = __objRest(_b, ["className", "variant", "children"]);
    const body = variant === "destructive" ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium text-destructive", children }) : children;
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var FormFieldContext = React6__namespace.createContext(
  {}
);
var FormField = ({ name, children }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(FormFieldContext.Provider, { value: { name }, children });
};
FormField.displayName = "FormField";

// src/lib/variants.ts
function createVariant(base, variants) {
  return (variant, variantValue) => {
    var _a;
    if (!variant || !variantValue) return base;
    const variantClasses = (_a = variants[variant]) == null ? void 0 : _a[variantValue];
    return cn(base, variantClasses);
  };
}

// src/index.ts
var version = "2.0.0";

exports.Badge = Badge;
exports.Button = Button;
exports.Card = Card;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
exports.Form = Form;
exports.FormControl = FormControl;
exports.FormDescription = FormDescription;
exports.FormField = FormField;
exports.FormItem = FormItem;
exports.FormLabel = FormLabel;
exports.FormMessage = FormMessage;
exports.Input = Input;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCell = TableCell;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.cn = cn;
exports.createVariant = createVariant;
exports.inputVariants = inputVariants;
exports.tokens = tokens;
exports.version = version;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map