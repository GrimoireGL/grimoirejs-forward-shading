import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";

export default class LightComponent extends Component {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    type: {
      converter: "String",
      defaultValue: "Directional"
    }
  };

  /**
   * The type of light changed last time.
   * @type {string}
   */
  private _lastLightType: string;

  public $awake(): void {
    this.getAttribute("type").addObserver((v) => this._onLightTypeChanged(v.Value), true);
  }

  /**
   * Called when the light type was changed
   * @param {string} type [description]
   */
  private _onLightTypeChanged(type: string): void {
    type = type.toLowerCase();
    // check if the light type was changed actually.
    if (type === this._lastLightType) {
      return;
    } else {
      this._lastLightType = type;
    }
    this._addLightTypeComponent(type);
  }

  private _addLightTypeComponent(type: string): void {
    switch (type) {
      case "directional":
        this.node.addComponent("DirectionalLightType", null, true);
        break;
      case "point":
        this.node.addComponent("PointLightType", null, true);
        break;
      case "spot":
        this.node.addComponent("SpotLightType", null, true);
        break;
    }
  }
}