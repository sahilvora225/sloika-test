import Industry from "./Industry";

class IndustryNode {
  id: string;
  name: string;
  children: IndustryNode[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.children = [];
  }

  populateIndustry = (industries: Industry[]): void => {
    for (let industry of industries) {
      if (industry.parentId === null) {
        this.children.push(new IndustryNode(industry.id, industry.name));
      } else {
        this.addIndustry(this, industry);
      }
    }
  };

  addIndustry = (node: IndustryNode, industry: Industry) => {
    var i: number = 0;
    for (; i < node.children.length; i++) {
      if (industry.id.search(node.children[i].id) !== -1) {
        this.addIndustry(node.children[i], industry);
        break;
      }
    }
    if (i === node.children.length) {
      node.children.push(new IndustryNode(industry.id, industry.name));
    }
  };

  static preOrderTraversal = (node: IndustryNode): {} => {
    return {
      [node.name]: [
        ...node.children.map((child) => this.preOrderTraversal(child)),
      ],
    };
  };
}

export default IndustryNode;
