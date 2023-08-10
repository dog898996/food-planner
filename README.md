# 데이터베이스 스키마
```mermaid
erDiagram
    FOOD ||--
    FOOD {
        string foodId PK
        string date
        string foodinfoId FK
    }
    FOODINFO {
        string foodinfoId PK
        string foodName
        number kcal
    }
```
foodid|date|foodinfoId
1|20-12-13|1-1
2|20-12-14|1-1

