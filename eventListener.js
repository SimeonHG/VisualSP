class EventListener {
	static addKey(key) {
		if(Object.keys(EventListener.keyCodeToKey).includes(key + "")) {
			EventListener.keysPressed.push(EventListener.keyCodeToKey[key]);
		}
	}

	static removeKey(key) {
		let index = EventListener.keysPressed.indexOf(EventListener.keyCodeToKey[key]);

		if (index > -1) {
       		EventListener.keysPressed.splice(index, 1);
    	}
	}

	static clearKeys() {
		EventListener.keysPressed = [];
	}

	static getKeys() {
		return EventListener.keysPressed;
	}
}

EventListener.keysPressed = [];
EventListener.keyCodeToKey = 
{
	"87" : "W",
	"65" : "A",
	"83" : "S", 
	"68" : "D",
	"17" : "CTRL",
	"67" : "C"
};