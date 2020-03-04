import { shallowMount } from "@vue/test-utils";
import Tabs from "@/components/Tabs";

describe("Tabs", () => {
  const propsData = {
    currentTab: "tab1",
    tabs: [
      { title: "Tab1", value: "tab1" },
      { title: "Tab2", value: "tab2" }
    ],
    updated: "currentValue"
  };

  it("should render correct count buttons", () => {
    const wrapper = shallowMount(Tabs, { propsData });
    expect(wrapper.findAll("button").length).toEqual(2);
  });

  describe("handleClick", () => {
    it("should call onClick with correct value", () => {
      const wrapper = shallowMount(Tabs, { propsData });
      wrapper.vm.handleClick("tab2");
      expect(wrapper.emitted("onClick")[0]).toEqual(["tab2"]);
    });

    it("should call moveActiveLine", () => {
      const wrapper = shallowMount(Tabs, { propsData });

      wrapper.vm.moveActiveLine = jest.fn();
      wrapper.vm.handleClick("tab2");

      expect(wrapper.vm.moveActiveLine).toBeCalledWith("tab2");
    });
  });

  // describe/("watch currentTab", () => {
  it("should call moveActiveLine if new value is not equal current value", async () => {
    const wrapper = await shallowMount(Tabs, { propsData });

    wrapper.vm.moveActiveLine = jest.fn();
    wrapper.setProps({ currentTab: "tab2" });

    console.log(wrapper.vm.currentTab);
    expect(wrapper.vm.moveActiveLine).toBeCalledWith(
      expect.objectContaining({ currentTab: "tab2" })
    );
  });

  it("should not call moveActiveLine if new value is equal current value", () => {
    const wrapper = shallowMount(Tabs, { propsData });

    wrapper.vm.handleClick("tab2");
    wrapper.vm.moveActiveLine = jest.fn();
    wrapper.setProps({ currentTab: "tab2" });

    expect(wrapper.vm.moveActiveLine).not.toHaveBeenCalled();
  });
  // });

  describe("watch updated", () => {
    it("should call moveActiveLine if new value is not equal current value", () => {
      const wrapper = shallowMount(Tabs, { propsData });

      wrapper.vm.moveActiveLine = jest.fn();
      wrapper.setProps({ updated: "newValue" });

      expect(wrapper.vm.moveActiveLine).toBeCalledWith("tab1");
    });

    it("should not call moveActiveLine if new value is equal current value", () => {
      const wrapper = shallowMount(Tabs, { propsData });

      wrapper.vm.moveActiveLine = jest.fn();
      wrapper.setProps({ updated: "currentValue" });

      expect(wrapper.vm.moveActiveLine).not.toHaveBeenCalled();
    });
  });

  describe("custom classes", () => {
    it("should contain custom-wrapper-class", () => {
      const wrapper = shallowMount(Tabs, {
        propsData: {
          ...propsData,
          wrapperClass: "custom-wrapper-class"
        }
      });

      const nav = wrapper.find("nav");
      expect(nav.classes()).toContain("custom-wrapper-class");
    });

    it("should contain custom-tab-class", () => {
      const wrapper = shallowMount(Tabs, {
        propsData: {
          ...propsData,
          tabClass: "custom-tab-class"
        }
      });

      const tab = wrapper.find("button");
      expect(tab.classes()).toContain("custom-tab-class");
    });

    it("should contain custom-tab-active-class", () => {
      const wrapper = shallowMount(Tabs, {
        propsData: {
          ...propsData,
          tabActiveClass: "custom-tab-active-class"
        }
      });

      const tabActive = wrapper.find(".tabs__item_active");
      expect(tabActive.classes()).toContain("custom-tab-active-class");
    });

    it("should contain custom-line-class", () => {
      const wrapper = shallowMount(Tabs, {
        propsData: {
          ...propsData,
          lineClass: "custom-line-class"
        }
      });

      const activeLine = wrapper.find(".tabs__active-line");
      expect(activeLine.classes()).toContain("custom-line-class");
    });
  });
});
