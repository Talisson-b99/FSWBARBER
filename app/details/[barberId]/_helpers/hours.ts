import { setHours, setMinutes, format, addMinutes, isAfter } from 'date-fns'

export function generateDayTimeList(date: Date): string[] {
  // Define o horário de início para 09:00
  const startTime = setMinutes(setHours(date, 9), 0)

  // Define o horário de término
  const endTime = setMinutes(setHours(date, 21), 0)

  // Define o intervalo entre cada horário na lista como 45 minutos
  const interval = 45

  // Inicializa uma lista vazia para armazenar os horários
  const timeList: string[] = []

  // Inicializa a variável de horário atual com o horário de início
  let currentTime = startTime

  // data atual
  const now = new Date()

  // Loop enquanto o horário atual for menor ou igual ao horário for término
  while (currentTime <= endTime) {
    // Verifica se o horário atual é após o horário atual do sistema.
    if (isAfter(currentTime, now)) {
      // Adiciona horário formatado (HH:mm) à lista
      timeList.push(format(currentTime, 'HH:mm'))
    }
    // Adiciona o intervalo ao horário atual para o próximo loop
    currentTime = addMinutes(currentTime, interval)
  }

  // Retorna a lista de horários gerada
  return timeList
}
