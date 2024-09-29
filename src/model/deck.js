class Deck {
    constructor(deck_id, deck_name, parent_deck_path = '', deck_type, deck_properties = [], layout_setting_front = null, layout_setting_back = null) {
        this.deck_id = deck_id;
        this.deck_name = deck_name;
        this.parent_deck_path = parent_deck_path || '';
        this.deck_status = 'ACTIVE';
        this.deck_path = this.createDeckPath();
        this.deck_type = deck_type;
        this.new_count = 0;
        this.learning_count = 0;
        this.overdue_count = 0;
        this.cooling_count = 0;
        this.deck_properties = deck_properties;
        this.layout_setting_front = layout_setting_front;
        this.layout_setting_back = layout_setting_back;
        this.deck_last_update = this.getCurrentTimestamp();
    }

    createDeckPath() {
        return this.parent_deck_path ? `${this.parent_deck_path}::${this.deck_name}` : this.deck_name;
    }
    setDeckName(newName) {
        this.deck_name = newName;
        this.deck_path = this.createDeckPath();
        this.updateLastUpdate();
    }
    getCurrentTimestamp() {
        return new Date().toISOString();
    }

    block() {
        this.deck_status = 'BLOCKED';
        this.updateLastUpdate();
    }

    active() {
        this.deck_status = 'ACTIVE';
        this.updateLastUpdate();
    }

    addProperty(propertyName) {
        if (!this.deck_properties.includes(propertyName)) {
            this.deck_properties.push(propertyName);
            this.updateLastUpdate();
        }
    }

    removeProperty(propertyName) {
        const index = this.deck_properties.indexOf(propertyName);
        if (index > -1) {
            this.deck_properties.splice(index, 1);
            this.updateLastUpdate();
        }
    }

    updateLastUpdate() {
        this.deck_last_update = this.getCurrentTimestamp();
    }

    getProperties() {
        return this.deck_properties;
    }

    getInfo() {
        return {
            deck_id: this.deck_id,
            deck_name: this.deck_name,
            parent_deck_path: this.parent_deck_path,
            deck_path: this.deck_path,
            deck_status: this.deck_status,
            deck_type: this.deck_type,
            new_count: this.new_count,
            learning_count: this.learning_count,
            overdue_count: this.overdue_count,
            cooling_count: this.cooling_count,
            deck_properties: this.deck_properties,
            layout_setting_front: this.layout_setting_front,
            layout_setting_back: this.layout_setting_back,
            deck_last_update: this.deck_last_update,
        };
    }
}

export default Deck;