import * as React from 'react';
import { testFileUpload } from '../../actions/models/resourses/resources';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return (<>
        <div className="info">
            <p>Электронный портал «Фольклор народов Сибири» - фундаментальный постоянно действующий проект, работа по которому ведется
коллективом сотрудников двух институтов Сибирского отделения Российской академии наук: <a href="http://www.philology.nsc.ru"> Института филологии (ИФЛ СО РАН)</a>, и Института систем информатики имени А.П. Ершова (ссылка).</p>
            <p> Разработка портала проведена при финансовой поддержке Российского гуманитарного научного фонда (2014-2016 гг.,
            проект №14-04-12010 Электронный ресурс «Фольклор народов Сибири»: текстовое, семантическое и мультимедийное
представление»).</p>
            <p> С 2019 года идет формирование новых подкорпусов портала, пополнение его новыми фольклоными материалами.
            Работы ведутся в рамках выполнения проекта Института филологии СО РАН «Культурные универсалии вербальных традиций
            народов Сибири и Дальнего Востока: фольклор, литература, язык» по гранту Правительства РФ для государственной поддержки
научных исследований, проводимых под руководством ведущих ученых (соглашение № 075-15-2019-1884).</p>
            <p>Для просмотра фольклорных текстов нажмите БИБЛИОТЕКА РЕСУРСОВ.</p>


        </div>
    </>
    );
};

export default Home;
