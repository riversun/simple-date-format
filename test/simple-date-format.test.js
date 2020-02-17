import SimpleDateFormat from '../src/simple-date-format';

const DATE0 = new Date('2019/04/01 01:02:03');
const DATE1 = new Date('2020/04/01 01:02:03');
const DATE2 = new Date('2020/12/31 10:11:00');
const DATE3 = new Date('04/01/2020 01:02:03');
const DATE4 = new Date('04/01/2020 15:02:03');
const DATE5 = new Date('04/01/2020 00:10:20');//for hh test
const DATE6 = new Date('04/01/2020 12:13:14');//for hh test
const DATE7 = new Date('Feb 28 2013 19:00:00 GMT-0500');

describe('SimpleDateFormat', () => {

    describe('setDay()', () => {
        test('normal yyyy/MM/dd HH:mm:ss', () => {
            const sdf = new SimpleDateFormat('E')
                .setDays(['日', '月', '火', '水', '木', '金', '土']);
            const testDate = new Date(DATE1);
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('水');
        });
    });

    describe('setMonths()', () => {
        test('normal yyyy/MMM/dd HH:mm:ss', () => {
            const sdf = new SimpleDateFormat('yyyy/MMM/dd HH:mm:ss')
                .setMonths(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
            const testDate = new Date(DATE1);
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/April/01 01:02:03');
        });
    });
    describe('format()', () => {


        //use 0-23 hours
        test('normal yy/MM/dd HH:mm:ss', () => {
            const testDate = new Date(DATE0);
            const sdf = new SimpleDateFormat('yy/MM/dd HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('19/04/01 01:02:03');
        });
        test('normal yyyy/MM/dd HH:mm:ss', () => {
            const testDate = new Date(DATE1);
            const sdf = new SimpleDateFormat('yyyy/MM/dd HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/04/01 01:02:03');
        });

        test('normal-us MM/dd/yyyy HH:mm:ss', () => {
            const testDate = new Date(DATE3);
            const sdf = new SimpleDateFormat('MM/dd/yyyy HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('04/01/2020 01:02:03');
        });
        test('normal yyyy/M/d H:m:s', () => {
            const testDate = new Date(DATE1);
            const sdf = new SimpleDateFormat('yyyy/M/d H:m:s');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/4/1 1:2:3');
        });
        test('src is 2-digits yyyy/M/d H:m:s', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat('yyyy/M/d H:m:s');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/12/31 10:11:0');
        });

        //use 1-12 hours
        test('normal yyyy/M/d h:m:s', () => {
            const testDate = new Date(DATE1);
            const sdf = new SimpleDateFormat('yyyy/M/d H:m:s');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/4/1 1:2:3');
        });


        test('src is 2-digits yyyy/M/d h:m:s', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat('yyyy/M/d h:m:s');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/12/31 10:11:0');
        });

        //format placed multi areas
        test('multi MM/dd/yyyy yyyy/MM/dd HH:mm:ss', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat('MM/dd/yyyy yyyy/MM/dd HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('12/31/2020 2020/12/31 10:11:00');
        });

        //with day of week
        test('with day of week and multi yyyy/MM/dd(E) HH:mm:ss yyyy/MM/dd(E) HH:mm:ss', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat('yyyy/MM/dd(E) HH:mm:ss yyyy/MM/dd(E) HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/12/31(Thu) 10:11:00 2020/12/31(Thu) 10:11:00');
        });

        //with name of month
        test('with name of month MMM', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat('E, dd MMM yyyy HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('Thu, 31 Dec 2020 10:11:00');
        });


        //with escaped strings
        test('escape string', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat('\'Hello world!\' yyyy/MM/dd(E) HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('Hello world! 2020/12/31(Thu) 10:11:00');
        });

        test('escape string single quote', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat('\'\'\'Hello world!\'\'\' yyyy/MM/dd(E) HH:mm:ss');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('\'Hello world!\' 2020/12/31(Thu) 10:11:00');
        });

        test('normal yy/MM/dd HH:mm:ss', () => {
            const testDate = new Date(DATE0);
            const sdf = new SimpleDateFormat("''yy/MM/dd HH:mm:ss");
            const formatted = sdf.format(testDate);
            expect(formatted).toBe("'19/04/01 01:02:03");
        });


        // AM/PM
        test('AM/PM yyyy/MM/dd HH:mm:ss a', () => {
            const testDate = new Date(DATE1);
            const sdf = new SimpleDateFormat('yyyy/MM/dd HH:mm:ss a');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/04/01 01:02:03 AM');
        });

        test('AM/PM yyyy/MM/dd HH:mm:ss a', () => {
            const testDate = new Date(DATE4);
            const sdf = new SimpleDateFormat('yyyy/MM/dd HH:mm:ss a');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/04/01 15:02:03 PM');
        });

        test('00:00:00 means AM12:00', () => {
            const testDate = new Date(DATE5);
            const sdf = new SimpleDateFormat('yyyy/MM/dd hh:mm:ss a');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/04/01 12:10:20 AM');
        });

        test('12:00:00 means PM12:00', () => {
            const testDate = new Date(DATE6);
            const sdf = new SimpleDateFormat('yyyy/MM/dd hh:mm:ss a');
            const formatted = sdf.format(testDate);
            expect(formatted).toBe('2020/04/01 12:13:14 PM');
        });

        //use timezone
        //TODO now timezone test can be run on locale of JAPAN
        if (new Date().getTimezoneOffset() === -540) {
            test('timezone yy/MM/dd HH:mm:ss Z', () => {
                const testDate = new Date(DATE7);
                const sdf = new SimpleDateFormat('yy/MM/dd HH:mm:ss Z');
                const formatted = sdf.format(testDate);
                expect(formatted).toBe('13/03/01 09:00:00 +0900');
            });

            test('timezone yy/MM/dd HH:mm:ss X', () => {
                const testDate = new Date(DATE7);
                const sdf = new SimpleDateFormat('yy/MM/dd HH:mm:ss X');
                const formatted = sdf.format(testDate);
                expect(formatted).toBe('13/03/01 09:00:00 +09');
            });
            test('timezone yy/MM/dd HH:mm:ss XX', () => {
                const testDate = new Date(DATE7);
                const sdf = new SimpleDateFormat('yy/MM/dd HH:mm:ss XX');
                const formatted = sdf.format(testDate);
                expect(formatted).toBe('13/03/01 09:00:00 +0900');
            });
            test('timezone yy/MM/dd HH:mm:ss XXX', () => {
                const testDate = new Date(DATE7);
                const sdf = new SimpleDateFormat('yy/MM/dd HH:mm:ss XXX');
                const formatted = sdf.format(testDate);
                expect(formatted).toBe('13/03/01 09:00:00 +09:00');
            });
        }

    });

    describe('formatWith()', () => {

        test('normal yyyy/MM/dd HH:mm:ss', () => {
            const testDate = new Date(DATE1);
            const sdf = new SimpleDateFormat();
            const formatted = sdf.formatWith('yyyy/MM/dd HH:mm:ss', testDate);
            expect(formatted).toBe('2020/04/01 01:02:03');
        });
        test('normal yyyy/M/d H:m:s', () => {
            const testDate = new Date(DATE1);
            const sdf = new SimpleDateFormat();
            const formatted = sdf.formatWith('yyyy/M/d H:m:s', testDate);
            expect(formatted).toBe('2020/4/1 1:2:3');
        });
        test('src is 2-digits yyyy/M/d H:m:s', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat();
            const formatted = sdf.formatWith('yyyy/M/d H:m:s', testDate);
            expect(formatted).toBe('2020/12/31 10:11:0');
        });

        test('multi MM/dd/yyyy yyyy/MM/dd HH:mm:ss', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat();
            const formatted = sdf.formatWith('MM/dd/yyyy yyyy/MM/dd HH:mm:ss', testDate);
            expect(formatted).toBe('12/31/2020 2020/12/31 10:11:00');
        });

        test('with day of week and multi yyyy/MM/dd(E) HH:mm:ss yyyy/MM/dd(E) HH:mm:ss', () => {
            const testDate = new Date(DATE2);
            const sdf = new SimpleDateFormat();
            const formatted = sdf.formatWith('yyyy/MM/dd(E) HH:mm:ss yyyy/MM/dd(E) HH:mm:ss', testDate);
            expect(formatted).toBe('2020/12/31(Thu) 10:11:00 2020/12/31(Thu) 10:11:00');
        });


    });
});
