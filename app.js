function getRandomNumber(max,min){
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data(){
        return {
            monsterHealth : 100,
            myHealth : 100,
            round : 0,
            isSurrendered : false,
            logs : []
        }
    },
    watch:{
        monsterHealth(value){
            if(value <= 0){
                this.monsterHealth = 0
            }
        },
        myHealth(value){
            if(value <= 0){
                this.myHealth = 0
            }
        }
    },
    computed :{
        cannotUseSpecialAttack(){
            return this.round % 3 != 0 || this.round == 0
        },
        gameEnded(){
            if(this.monsterHealth <= 0 && this.myHealth <= 0){
                return 'draw'
            }else if(this.monsterHealth <= 0 ){
                return 'you won'
            }else if(this.myHealth <= 0 || this.isSurrendered){
                return 'monster won'
            }else{
                return false
            }
        }
    },
    methods: {
        attack(){
            const attackMonsterBy = getRandomNumber(12,5)
            this.monsterHealth -= attackMonsterBy
            this.monsterAttack()
            this.addLogMessage(true,`attacked by `,attackMonsterBy)
            this.round += 1

        },
        specialAttack(){
            if(this.round % 3 == 0){
                const attackMonsterBy = getRandomNumber(25,10)
                this.monsterHealth -= attackMonsterBy
                this.monsterAttack()
                this.addLogMessage(true,`attacked by `,attackMonsterBy)
                this.round += 1
            }
        },
        monsterAttack(){
            const attackMeBy = getRandomNumber(15,8)
            this.addLogMessage(false,`attacked by `,attackMeBy)
            this.myHealth -= attackMeBy
        },
        healMe(){
            const healingValue = getRandomNumber(20,8)
            this.myHealth = this.myHealth + healingValue <= 100 ? this.myHealth + healingValue : 100
            this.monsterAttack()
            this.addLogMessage(true,`healed by `,healingValue,true)

            this.round++

        },
        restartGame(){
            this.monsterHealth = 100
            this.myHealth = 100
            this.round = 0
            this.isSurrendered = false
            this.logs = []
            
        },
        surrender(){
            this.isSurrendered = true
            this.addLogMessage(true,`surrenered `)

        },
        addLogMessage(is_player,message,value = 0,is_heal = false){
            this.logs.unshift({
                is_player,message,value,is_heal
            })
        }

    },
})
app.mount('#game')