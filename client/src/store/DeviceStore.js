import { makeAutoObservable } from "mobx";

class DeviceStore {
    types = [];
    brands = [];
    devices = [];
    totalCount = 0;
    page = 1;
    limit = 12;

    selectedType = null;
    selectedBrand = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTypes(types) {
        this.types = types;
    }

    setBrands(brands) {
        this.brands = brands;
    }

    setDevices(devices) {
        this.devices = devices;
    }

    setTotalCount(count) {
        this.totalCount = count;
    }

    setPage(page) {
        this.page = page;
    }

    setSelectedType(type) {
        this.selectedType = type;
    }

    setSelectedBrand(brand) {
        this.selectedBrand = brand;
    }

    get filteredTypes() {
        if (!this.selectedBrand) return this.types;
        const brandId = this.selectedBrand.id;
        const typesWithBrand = new Set(
            this.devices
                .filter(device => device.brandId === brandId)
                .map(device => device.typeId)
        );
        return this.types.filter(type => typesWithBrand.has(type.id));
    }

    get filteredBrands() {
        if (!this.selectedType) return this.brands;
        const typeId = this.selectedType.id;
        const brandsWithType = new Set(
            this.devices
                .filter(device => device.typeId === typeId)
                .map(device => device.brandId)
        );
        return this.brands.filter(brand => brandsWithType.has(brand.id));
    }
}

const deviceStore = new DeviceStore();

export default deviceStore;
