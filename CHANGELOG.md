# Changelog

## [1.9.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.8.0...v1.9.0) (2025-06-26)


### Features

* add fullscreen toggle functionality to NavLayout component ([bd8e0d5](https://github.com/FelizCoder/crewstand.frontend/commit/bd8e0d551fa3474d6595ec112e0e9ca2f0ceb9bc)), closes [#51](https://github.com/FelizCoder/crewstand.frontend/issues/51)


### Bug Fixes

* add dependency array on useEffect hook ([5675b72](https://github.com/FelizCoder/crewstand.frontend/commit/5675b72d7b1437d90237eb572158905376d52b65))

## [1.8.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.7.0...v1.8.0) (2025-06-19)


### Features

* add `BalancedTestMissionsButton` ([b4dca26](https://github.com/FelizCoder/crewstand.frontend/commit/b4dca265b60180b2fe52cc32f49bd67216d4ae9c))
* add `RandomDayMissionButton` ([db86934](https://github.com/FelizCoder/crewstand.frontend/commit/db86934c83b6a7675803e8b9b5035fa137ad56f4))

## [1.7.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.6.0...v1.7.0) (2025-04-23)


### Features

* add CompletedMissionType ([6d0760f](https://github.com/FelizCoder/crewstand.frontend/commit/6d0760fcdf33432fd1852bd8db485b7cdcc5e517))
* add dashboard landing page ([96d0dc3](https://github.com/FelizCoder/crewstand.frontend/commit/96d0dc36ea0ea42eae037958212d62501583df9c)), closes [#40](https://github.com/FelizCoder/crewstand.frontend/issues/40)
* add MissionStats component to Crewstand Dashboard ([8c82aa0](https://github.com/FelizCoder/crewstand.frontend/commit/8c82aa0b6f5d55135cc0176f88a566de8e562783))
* enhance MissionStats component with Ant Design Card and Table for feature display ([95ed39b](https://github.com/FelizCoder/crewstand.frontend/commit/95ed39b89be04938fad9870c618d521305c2ad11))
* update mission classification types ([0e002f0](https://github.com/FelizCoder/crewstand.frontend/commit/0e002f0dc62953e79f0aa82a53a528686230e5ad)), closes [#40](https://github.com/FelizCoder/crewstand.frontend/issues/40)

## [1.6.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.5.0...v1.6.0) (2025-04-08)


### Features

* add mission execution control UI and API handling ([b4946e5](https://github.com/FelizCoder/crewstand.frontend/commit/b4946e511abb26669dea1d89b5c71128136c5057))
* add mission status endpoints ([789a519](https://github.com/FelizCoder/crewstand.frontend/commit/789a51911926057fddd868a569c6194fe57916df))
* **api-types:** Enhance FlowControlMission type with new properties & update AddToQueue post data ([8035747](https://github.com/FelizCoder/crewstand.frontend/commit/8035747f670b8231ba6a8f27ed7dfe49bcfd3d88)), closes [#44](https://github.com/FelizCoder/crewstand.frontend/issues/44)


### Bug Fixes

* Update addToQueueV1MissionsFlowQueuePost to accept array payload ([6d1590e](https://github.com/FelizCoder/crewstand.frontend/commit/6d1590e0866e5cabc596d12b1db21a533275e732)), closes [#44](https://github.com/FelizCoder/crewstand.frontend/issues/44)

## [1.5.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.4.0...v1.5.0) (2025-02-28)


### Features

* **api:** add flow mission management endpoints and types ([7bc5df2](https://github.com/FelizCoder/crewstand.frontend/commit/7bc5df2c216feaf7273bf39e559fcfac897a56ed))
* **automatic:** Enhance Automatic Page with Solenoid Valves and Queue Mission Button ([ea74f44](https://github.com/FelizCoder/crewstand.frontend/commit/ea74f44a6bb7ce21618c0a7a6197a181e5b3f618))
* **queue mission:** add mission queueing functionality with trajectory control ([d480674](https://github.com/FelizCoder/crewstand.frontend/commit/d480674f5b850762a15788a54d1187a0c5731ccd)), closes [#37](https://github.com/FelizCoder/crewstand.frontend/issues/37)
* **queueMissionDrawer:** Introduce Skeleton for Queue Mission Drawer Component ([1485d50](https://github.com/FelizCoder/crewstand.frontend/commit/1485d50cbe98c2c798c06a76c028104e7b6d1352)), closes [#37](https://github.com/FelizCoder/crewstand.frontend/issues/37)

## [1.4.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.3.0...v1.4.0) (2025-02-20)


### Features

* add HandleAllButtons component to manage solenoid valves ([c03baa9](https://github.com/FelizCoder/crewstand.frontend/commit/c03baa9eaed51afc138b5d0811d492ac8f9d3579)), closes [#34](https://github.com/FelizCoder/crewstand.frontend/issues/34)


### Bug Fixes

* install corepack globally in the Dockerfile ([c663d90](https://github.com/FelizCoder/crewstand.frontend/commit/c663d9056d50b85c4d1607fc7d2a8242bb0d8fd3))

## [1.3.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.2.0...v1.3.0) (2025-01-27)


### Features

* **automatic:** add iframe for flow-rate display ([ba63645](https://github.com/FelizCoder/crewstand.frontend/commit/ba63645834d0ebccb563d1c2e7a767f41ff5e818)), closes [#28](https://github.com/FelizCoder/crewstand.frontend/issues/28)

## [1.2.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.1.0...v1.2.0) (2025-01-23)


### Features

* **automatic:** Add API call for setpoint changes & integrate with WebSocket updates ([a364c20](https://github.com/FelizCoder/crewstand.frontend/commit/a364c20ad4d61049397925a6867cc4469ee162dd))
* **automatic:** Introduce Flow Control Page with dynamic setpoint management ([f38834f](https://github.com/FelizCoder/crewstand.frontend/commit/f38834ff66a1daa90fe0bec706d479fff4e34bf2)), closes [#29](https://github.com/FelizCoder/crewstand.frontend/issues/29)
* **client:** add sensor management functionality and navigation link ([b065ff9](https://github.com/FelizCoder/crewstand.frontend/commit/b065ff948a69b28d46ebe41e69aa64ee681d28b0)), closes [#29](https://github.com/FelizCoder/crewstand.frontend/issues/29)
* **InputConfirmed:** Add optional 'disabled' prop ([75c7e79](https://github.com/FelizCoder/crewstand.frontend/commit/75c7e7901ee7e6428f65d9d811a026e3b91f7270))
* **InputConfirmed:** introduce InputConfirmed ([4e0da7e](https://github.com/FelizCoder/crewstand.frontend/commit/4e0da7efa14eab8b40a5692f28ea72b4fa8f9e18)), closes [#29](https://github.com/FelizCoder/crewstand.frontend/issues/29)
* **Layout:** Introduce New Page & Update Layout with Ant Design Registry ([4a44e39](https://github.com/FelizCoder/crewstand.frontend/commit/4a44e394bec404ba947e1eee2abf7eb2b7b3a43a)), closes [#29](https://github.com/FelizCoder/crewstand.frontend/issues/29)


### Bug Fixes

* **automatic:** ensure `window.location` is defined ([47808e8](https://github.com/FelizCoder/crewstand.frontend/commit/47808e8f9b53ba1056537cd934eb620170c40479)), closes [#29](https://github.com/FelizCoder/crewstand.frontend/issues/29)

## [1.1.0](https://github.com/FelizCoder/crewstand.frontend/compare/v1.0.1...v1.1.0) (2025-01-08)


### Features

* **api:** Add current_position property to ProportionalValve schema and type ([84557e5](https://github.com/FelizCoder/crewstand.frontend/commit/84557e5b544e234b595c9b1b42bf8bdc41d3fe2b))
* **controls:** connect control ui components to websockets ([bc0cc40](https://github.com/FelizCoder/crewstand.frontend/commit/bc0cc40f707a01bb6e20e2403ac2415551cdf4c1)), closes [#24](https://github.com/FelizCoder/crewstand.frontend/issues/24)
* **ProportionalSlider:** real-time state updates via websocket ([aeb8160](https://github.com/FelizCoder/crewstand.frontend/commit/aeb81605eae87c636728e1c66b7f247fc577c92b))

## [1.0.1](https://github.com/FelizCoder/crewstand.frontend/compare/v1.0.0...v1.0.1) (2024-12-17)


### Bug Fixes

* **config/env:** Remove BACKEND_WS_URI, migrate to derive WebSocket URI from BACKEND_URI ([3f1c5e5](https://github.com/FelizCoder/crewstand.frontend/commit/3f1c5e5ccaff36d3bb7f4378dc092c2ffc53a467))

## [1.0.0](https://github.com/FelizCoder/crewstand.frontend/compare/v0.4.0...v1.0.0) (2024-12-16)


### ⚠ BREAKING CHANGES

* **api:** renamed state Property of actuators accordingly

### Code Refactoring

* **api:** use state in actuator types ([2e14151](https://github.com/FelizCoder/crewstand.frontend/commit/2e14151c2125da87818206a4cca670ef37fd2a02))

## [0.4.0](https://github.com/FelizCoder/crewstand.frontend/compare/v0.3.0...v0.4.0) (2024-12-02)


### Features

* **api:** add multiple flowmeter integration ([16208c9](https://github.com/FelizCoder/crewstand.frontend/commit/16208c9d06e218e3ca322d961be28eaf99494c47))

## [0.3.0](https://github.com/FelizCoder/crewstand.frontend/compare/v0.2.0...v0.3.0) (2024-11-18)


### Features

* **api:** generate current types ([d6d465b](https://github.com/FelizCoder/crewstand.frontend/commit/d6d465bfbbc21886f0d3e8f80c305fa4458e6863))
* **sensors:** add support for WebSocket connections to backend API ([4ef4f70](https://github.com/FelizCoder/crewstand.frontend/commit/4ef4f7026ec75989982afdcba34a8eabc850ed71)), closes [#11](https://github.com/FelizCoder/crewstand.frontend/issues/11)

## [0.2.0](https://github.com/FelizCoder/crewstand.frontend/compare/v0.1.0...v0.2.0) (2024-10-23)


### Features

* **actuators:** Enhance actuator display and improve API error handling ([2861839](https://github.com/FelizCoder/crewstand.frontend/commit/286183932f1a5fa90ee2adb88788cd0d620f089b))
* **ActuatorSlider:** enhance actuator UI components with InputNumber and refactor actuator switch components ([301e573](https://github.com/FelizCoder/crewstand.frontend/commit/301e5731ccace817bde50c4e8b44bbc618d40865))
* **actuators:** responsive layout for Switch rows ([f8f2db2](https://github.com/FelizCoder/crewstand.frontend/commit/f8f2db26039587782dc3acbbba691d0e76bfa563))
* add icons for actuators ([a40c42a](https://github.com/FelizCoder/crewstand.frontend/commit/a40c42ab8b889bb3e6106a2ee2da1940e5ebf415))
* **icon:** use water drop icon ([3955c84](https://github.com/FelizCoder/crewstand.frontend/commit/3955c8425ae29ff55d29fa2ff8306c93ce59f1a6))
* **meta:** add metadata to website ([3f90c80](https://github.com/FelizCoder/crewstand.frontend/commit/3f90c80816197b98b521792d57f3eac2264bd3f4))

## 0.1.0 (2024-10-14)


### Features

* **actuators:** implement control UI based on actuator type ([43316e6](https://github.com/FelizCoder/crewstand.frontend/commit/43316e64116fc7cd9b80254a1b3c073d9c4d3609))
* **actuators:** move control panel to root ([024ef4e](https://github.com/FelizCoder/crewstand.frontend/commit/024ef4e12985db5a570b1d13f8b8f4b8ae2f4db2))
* **api:** auto generated axios client ([90ead7e](https://github.com/FelizCoder/crewstand.frontend/commit/90ead7e9b872943be5b3e6a7b27023abc26f2c5a))
* **docker:** add Dockerfile ([10f9c94](https://github.com/FelizCoder/crewstand.frontend/commit/10f9c94ebc9577c0be954308bf3c2418cc0bbddc))


### Continuous Integration

* **release:** set initial release ([f2d075c](https://github.com/FelizCoder/crewstand.frontend/commit/f2d075cb70186a16c15f4ffa5606c737879b08d0))
