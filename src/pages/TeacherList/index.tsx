import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Conheça os professores disponíveis">
                <form id="search-teachers">
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e => { setSubject(e.target.value) }}
                        options={[
                            { value: 'HTML/CSS', label: 'HTML/CSS' },
                            { value: 'JavaScript', label: 'JavaScript' },
                            { value: 'Node.js', label: 'Node.js' },
                            { value: 'React', label: 'React' },
                            { value: 'Vue.js', label: 'Vue.js' },
                            { value: 'Angular', label: 'Angular' },
                            { value: 'UI/UX', label: 'UI/UX' },
                        ]}
                    />
                    <Select 
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={e => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda' },
                            { value: '2', label: 'Terça' },
                            { value: '3', label: 'Quarta' },
                            { value: '4', label: 'Quinta' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input 
                        name="time"
                        label="Horário"
                        type="time"
                        value={time}
                        onChange={e => { setTime(e.target.value) }}
                    />
                    <button type="submit" onClick={searchTeachers}>
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>
                { teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                }) }
            </main>
        </div>
    )
}

export default TeacherList;