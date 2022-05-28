# Interactive map

The app to look through the map of your department and get information about each room.


### Table of Contents

* [Features](#Features)
* [Glossary](#Glossary)
* [UML diagrams](#UML-diagrams)
* [Used design patterns](#Used-design-patterns)


# Features
* Explore your Faculty map
* Select Floor to see its schema
* Hover any room to get its short information
* Click any room to get its detailed description
* Search needed room on the Floor map
* Links to personnel webpages (if any exist)

### In future releases (beyond the scope of university lab)
* Evacuation routes
* User location detection (inside the faculty) and routes to the selected room
* Links to room schedule (mytimetable.live)
* Filter empty (in schedule term) rooms
* Faculty room search
* Constant room links (which can be shared and will point to the same room)
* Links to Faculty site on University map


# Glossary

## Related
**Interactive map** - the name of the application with full functionality.

**Interactive Faculty map** - the name of a certain release of the app with functionality limited to only the map of Faculty of Computer Science and Cybernetics.

**Department** - is a division of a university or school faculty devoted to a particular academic discipline. [(Wikipedia)](https://en.wikipedia.org/wiki/Academic_department)

**Faculty** - is a building (or its part) where a group of related departments is located (e.g. Faculty of Computer Science and Cybernetics).

**Floor** - is a horizontal part of a building with no (or minimal) obstacles (stairs etc) between its parts.

**Room** - is a part of a building with explicit borders (e.g. walls) that can be assigned personnel and/or department.

**Search room** - filter Faculty's or Floor's rooms by name at correspoding Faculty or Floor.

**Explore** (Faculty/Floor map) - look on a Map, select appropriate Floor/Room and search Rooms list.

## Components
**SVG map** - is a schema of a Faculty or a Floor, on which objects (Floors, Rooms etc) can be selected.

**List** (of Floors, Rooms) - list of objects (Floors or Rooms) on specific Faculty or Floor. Clicking on a certain object will select it on the svg map.

**Search bar** - an input which performs search room.

**Room info block** - a block with detailed Room information.

(Faculty/Floor) **Map** - svg map, list of objects (Floors, Rooms etc) on it and a search bar.


# UML diagrams

### communication diagram

![communication diagram](./UML_diagrams/png/communication.png)

### useCase diagram

![useCase diagram](./UML_diagrams/png/useCase.png)

### component diagram

![component diagram](./UML_diagrams/png/component.png)


# Used design patterns

## Adapter

### Description:
It is a structural design pattern that allows objects with incompatible interfaces to collaborate.
Adapter is a special object that converts the interface of one object so that another object can understand it. An adapter wraps one of the objects to hide the complexity of conversion happening behind the scenes. 

### Code:
[Data Adapter](https://github.com/actpohabtNS/interactive-map/blob/master/src/data/DataAdapter.js).

### Adaptee:
[JS object with FCSC Floors and Rooms data](https://github.com/actpohabtNS/interactive-map/blob/master/src/data/fcsc.js).

### Adaptee interface:
FCSC object with its fields

### Adapter interface:
Faculty level: facultyMap(), facultySVGMap(), floorsList(), facultyInfo().
Floor level: floor(floor_id), floorMap(floor_id), floorSVGmap(floor_id), roomsList(floor_id).

### Adapter usage:
[BuildingPage](https://github.com/actpohabtNS/interactive-map/blob/master/src/pages/BuildingPage.js), [FloorPage](https://github.com/actpohabtNS/interactive-map/blob/master/src/pages/FloorPage.js).



# React Design Patterns and Principles

## Conditional Rendering

### Description:
If/else statements can't be used inside a component declaration, so short-circuit evaluation and ternary operator should be used instead.

### Code:
[Header's component goBack element, breadcrumbs and tooltip](https://github.com/actpohabtNS/interactive-map/blob/master/src/components/Header.js).

[Room's component staff list](https://github.com/actpohabtNS/interactive-map/blob/master/src/components/Room.js).


## State hoisting

### Description
Whenever a container needs to hold and change the state of its child, a callback is passed to that child. The state is hoisted to the container, by the provided callback, where it's used to update local state.

### Code:
[Room List component events](https://github.com/actpohabtNS/interactive-map/blob/master/src/components/RoomList.js).

[Room component events](https://github.com/actpohabtNS/interactive-map/blob/master/src/components/Room.js).


## Higher-Order Components (HOC)

### Description
Higher-Order Components are basically a function that receive a component as an argument and return a new component with specific business logic inside.

### Code
[Custom Link withRouter function](https://github.com/actpohabtNS/interactive-map/blob/master/src/components/CustomLink.js).
