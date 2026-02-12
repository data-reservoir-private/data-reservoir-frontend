import { GenIcon, IconBaseProps } from "react-icons";

/**
 * Transjakarta Icon SVG
 * @link https://sustainability.transjakarta.co.id/
 */
export const TransjakartaIcon = (props : IconBaseProps) => GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 61 65" }, "child": [{ "tag": "path", "attr": {"d": "M8.92371 9.68698C0.705818 18.3427 -1.83189 30.7156 1.31823 41.6613L20.2917 21.6647C22.5309 19.3103 26.1671 19.3103 28.4101 21.6728C30.6531 24.0313 30.6531 27.8572 28.4178 30.2197L6.99076 52.7924C7.59552 53.5543 8.23091 54.3083 8.91988 55.0339C20.8046 67.5479 40.0767 67.5479 51.9652 55.0339C60.1831 46.3822 62.7132 34.0134 59.5707 23.0717L40.5666 43.0844C38.3236 45.4227 34.7065 45.4227 32.475 43.0683C30.2359 40.7098 30.2359 36.896 32.4521 34.5294H32.4482L53.8982 11.9326C53.2896 11.1706 52.6504 10.4167 51.9691 9.69101C46.0286 3.43403 38.2432 0.305542 30.4502 0.305542C22.6572 0.305542 14.868 3.43 8.92371 9.69101" }, "child": [] }] })(props);

/**
 * Element Icon SVG
 */
export const ElementIcon = (props: IconBaseProps) => GenIcon({
  tag: 'svg',
  attr: {
    'viewBox': '0 0 100 100',
    fill: "none",
    stroke: 'currentColor',
    "strokeWidth": "0",
    style: "overflow: visible;"
  },
  child: [
    {
      tag: 'circle',
      attr: {
        cx: "50",
        cy: "50",
        r: "40",
        stroke: 'currentColor',
        "strokeWidth": "6",
      },
      child: []
    },
    {
      tag: 'circle',
      attr: {
        cx: "50",
        cy: "50",
        r: "18",
        strokeWidth: "0",
        fill: 'currentColor',
      },
      child: []
    },
    {
      tag: 'circle',
      attr: {
        cx: "73",
        cy: "19",
        r: "10",
        strokeWidth: "0",
        fill: 'currentColor',
      },
      child: []
    }
  ]
})(props);