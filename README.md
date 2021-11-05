# Asteroids Game [Final]

#### Missed Atari slot machines?

Here is the game for you. Legendary **Asteroids!**

Click here to play --> [**PLAY**](https://vitalii-8d.github.io/asteroids-oop/)

Developed with desire of creating the most beautifull JS game architecture 😅 using:
* MVC
* OOP principles
* A bit of patterns
* ... and React button in the middle 😂

#### Що конкретно я намагався тут зробити:
- MVC (розділення на 3 компоненти: Game з логікою, Display з функціями рендеру і Controller з інпутами)
- Fixed step game loop - клас Engine який дозволяє грі оновлюватись з заданою частотою. 
- Клас Collider який можуть наслідувати інші класи з перевантаженим методом checkCollisionBetween, що дозволяє визначати колізії для одиничних об'єктів, масивів об'єктів та будь яких їх комбінацій(будь які схожості з Phaser 3 - випадковість 😅)
- Particles - клас з частинками, які розлітаються при вибусі астероїду
- Клас AsteroidBelt - фасад, який містить в собі масив астероїдів, AsteroidFactory та інтерфейс для створення астероїдів на всі життєві випадки 😊
- Ship`s LaserGun with the simple interface which allow to simply change gun`s type.

> OOP game
