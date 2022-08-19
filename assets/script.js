window.onload = _ => {
    const replace = document.getElementById('replace')
    replace.addEventListener('click', _ => buttonClick())
}
const buttonClick = _ => {
    const slills = getSkill()
    //console.log(slills)
    const newChatpalette = getNewChatpalette(slills)
    //console.log(newChatpalette)
    const chatpaletteReplace = document.getElementById('chatpaletteReplace')
    chatpaletteReplace.value = newChatpalette
}
const getSkill = _ => {
    const skill = document.getElementById('skill')
    const elements = skill.querySelectorAll('label, li')
    let isCheck = false
    let obj = {}
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        const text = element.textContent
        const tag = element.tagName
        isCheck = (tag === 'LABEL') ? element.previousElementSibling.checked : isCheck
        obj[text] = isCheck
        //console.log(`${tag} / ${text} / ${isCheck}`)
    }
    return obj
}
const getNewChatpalette = (slills) => {
    const chatpaletteElement = document.getElementById('chatpalette')
    const chatpaletteValue = chatpaletteElement.value || ''
    const chatpaletteArray = chatpaletteValue.split(/\n/)
    const dice = document.getElementById('dice')
    const diceValue = dice.value || '0'
    const decision = document.getElementById('decision')
    const decisionValue = decision.value || '0'
    let chatCommandArray = []
    //console.log(`${diceValue} / ${decisionValue}`, chatpaletteArray)
    for (let i = 0; i < chatpaletteArray.length; i++) {
        const chatpalette = chatpaletteArray[i]
        const chatpalleteArray = chatpalette.split(/\s/)
        const skillName = chatpalleteArray[1].replace(/（.*）/, '：○○')
        const isReplace = slills[skillName]
        if (isReplace) {
            if (diceValue !== '0') chatpalleteArray[0] = chatpalleteArray[0].replace(/(\d)DM/, `($1+${diceValue})DM`)
            if (decisionValue !== '0') chatpalleteArray[0] = chatpalleteArray[0].replace(/<=(\d)/, `<=($1+${decisionValue})`)
        }
        chatCommandArray.push(`${chatpalleteArray[0]} ${chatpalleteArray[1]}`)
        //console.log(chatpalleteArray, slills[skillName])
    }
    const newChatpalette = chatCommandArray.join('\n')
    return newChatpalette
}