/**
 * Frontend Developer Quick Assessment
 * (expected completion time: 20 minutes)
 *
 * Given the URL of a dynamically defined list of industries,
 * load the JSON file and display its entries as
 * a hierarchy of lists on the page.
 *
 * Each entry in industries.json contains ID of the
 * entry, its name, and its parentId (which may be null
 * for root categories).
 *
 * FOR EXAMPLE, given industries.json containing:
 * [
 *   { "name": "Financials", "id": "40", "parentId": null },
 *   { "name": "Information Technology", "id": "45", "parentId": null },
 *   { "name": "Software & Services", "id": "4510", "parentId": "45" },
 *   { "name": "IT Services", "id": "451020", "parentId": "4510" },
 * ]
 *
 * THE OUTPUT MUST BE:
 *   * Financials
 *   * Information Technology
 *       * Software & Services
 *           * IT Services
 *
 *
 * The list of industries contains a few dozen entries and
 * will be at most 4 levels deep.
 *
 * CODE QUALITY REQUIREMENTS:
 *
 * Add TypeScript types as necessary, including replacing
 * existing `any` types.
 *
 * Please make sure that your code does not produce any
 * linter issues (see the "Problems" tab below the
 * browser on the right).
 *
 * You are _not required_ to use any libraries; however,
 * you may choose to use a library that suits the task.
 *
 * Feel free to test it with other versions of industries.json.
 * Please include links to the other versions in the comments.
 *
 * GOOD LUCK!
 * If you have any questions, don't hesitate to
 * reach out to ai@sloika.xyz.
 */

import React, { useEffect, useState } from "react";

import Industry from "./utility/Industry";
import IndustryNode from "./utility/IndustryNode";

import "./styles.css";

const INDUSTRIES_JSON_URL =
  "https://gist.githubusercontent.com/freeatnet/6050f1eea22564d437d91a04f0efe5b9/raw/0a02e865fc92a85a20a3c63f952a6f760c669f50/industries.json";

const industryJSX = (indList: { [key: string]: [] }) => {
  let indJSX: any = null;
  for (var key of Object.keys(indList)) {
    let value = indList[key];
    if (key === "") {
      indJSX = (
        <React.Fragment>
          {indJSX}
          {value.map((val: {}) => industryJSX(val))}
        </React.Fragment>
      );
      console.log(indJSX);
    } else if (value.length == 0) {
      indJSX = (
        <React.Fragment>
          {indJSX}
          <li>{key}</li>
        </React.Fragment>
      );
    } else {
      indJSX = (
        <React.Fragment>
          {indJSX}
          <li>
            {key}
            <ul>{value.map((val: {}) => industryJSX(val))}</ul>
          </li>
        </React.Fragment>
      );
    }
  }
  return indJSX;
};

function IndustriesList({ industries }: { industries: Industry[] }) {
  let root = new IndustryNode("", "");
  root.populateIndustry(industries);
  let traversalData: {} = IndustryNode.preOrderTraversal(root);

  return <ul>{industryJSX(traversalData)}</ul>;
}

export default function App() {
  let [industries, setIndustries] = useState<Industry[]>([]); // TODO: Load industries

  useEffect((): void => {
    fetch(INDUSTRIES_JSON_URL)
      .then((res) => res.json())
      .then((data) => setIndustries(data));
  }, []);

  return (
    <div className="App">
      <IndustriesList industries={industries} />
    </div>
  );
}
