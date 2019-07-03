class Selection {

    static begin() {
        Selection.start = grid.getClickedSquare();
    }

    static update() {
        Selection.current = grid.getClickedSquare();
    }

    static end() {
        let start = Selection.start;
        let end = Selection.current;

        if (!end || !start) {
            return null;
        }

        let xW = end.x - start.x;
        let yW = end.y - start.y;

        end.x += xW >= 0 ? Square.width : 0;
        end.y += yW >= 0 ? Square.width : 0;


        Selection.start = undefined;
        Selection.current = undefined;

        return {
            start: start,
            end: end
        }
    }

    static draw() {
        let st = Selection.start;
        let end = Selection.current;
        if (!st || !end) {
            return;
        }
        fill(90, 90, 90, 90);

        let wX = end.x - st.x;
        let wY = end.y - st.y;
        wX += wX >= 0 ? Square.width : 0;
        wY += wY >= 0 ? Square.width : 0;

        rect(st.x, st.y, wX, wY);
    }


}
